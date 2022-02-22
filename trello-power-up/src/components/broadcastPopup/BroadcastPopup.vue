<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { Trello } from '../../../typings/trello';
import { getTrelloApiService } from '../../services/trello';
import { ApiResponse } from '../../services/types';
import { EpisodeBroadcast } from './types';
import StartBroadcasting from './StartBroadcasting.vue';
import BroadcastingInProgress from './BroadcastingInProgress.vue';
import { iframeInstance } from '../../power-up';
import useStoredEpisode from '../../trello-storage';

defineProps<{ msg: string }>();

type ListParams = {
    id: string;
    name: string;
};

type Operation = 'start' | 'stop';

const LIST_PREFIX = '[ Rec:🔴 ] ';

const state = reactive<{ list: ListParams | null; loading: boolean }>({
    list: null,
    loading: true,
});

const { episode, set: setEpisode } = useStoredEpisode();

const notifyUser = (
    operation: Operation,
    response: ApiResponse<unknown>,
    trello: Trello.PowerUp.IFrame = iframeInstance(),
) => {
    switch (response.state) {
        case 'error':
            trello.alert({
                display: 'error',
                message: `❌ Cannot ${operation} broadcasting:\n${response.error}`,
            });
            break;
        case 'success':
            trello.alert({
                display: 'success',
                message: `${operation} broadcasting news from list "${state.list?.name}"`,
            });
    }
};

onMounted(async () => {
    state.list = await iframeInstance().list('id', 'name');
    state.loading = false;
});

const updateListName = async (operation: Operation, name: string) =>
    state.list &&
    notifyUser(
        operation,
        await getTrelloApiService().lists.update(state.list.id, {
            name,
        }),
    );

const startBroadcasting = async (episode: EpisodeBroadcast) => {
    state.loading = true;
    await Promise.all([
        setEpisode(episode),
        state.list && updateListName('start', `${LIST_PREFIX}${state.list.name}`),
    ]);
    iframeInstance().closePopup();
};

const stopBroadcasting = async () => {
    state.loading = true;
    await Promise.all([
        setEpisode(null),
        state.list && updateListName('stop', state.list.name.replaceAll(LIST_PREFIX, '')),
    ]);
    iframeInstance().closePopup();
};
</script>

<template>
    <BroadcastingInProgress v-if="episode" :episode="episode" @stop="stopBroadcasting" />
    <StartBroadcasting v-else @started="startBroadcasting" />
</template>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
