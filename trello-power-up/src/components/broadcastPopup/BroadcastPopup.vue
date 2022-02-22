<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Trello } from '../../../typings/trello';
import { environmentConfig } from '../../configuration';
import { getTrelloApiService } from '../../services/trello';
import { ApiResponse } from '../../services/types';
import { EpisodeBroadcast } from './types';
import StartBroadcasting from './StartBroadcasting.vue';
import BroadcastingInProgress from './BroadcastingInProgress.vue';

defineProps<{ msg: string }>();

type ListParams = {
    id: string;
    name: string;
};

type Operation = 'start' | 'stop';

const LIST_PREFIX = '[ Rec:🔴 ] ';

const state = reactive<{ list: ListParams | null; episode: EpisodeBroadcast | null }>({
    list: null,
    episode: null,
});

/**
 * When called as Web API callback, we have to instantiate new iFrame helper object
 * from trello. If not - we're getting CORS error.
 */
const iframeInstance = (): Trello.PowerUp.IFrame => {
    const { appKey, appName } = environmentConfig.trello;

    return window.TrelloPowerUp.iframe({
        appKey,
        appName,
    });
};

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
    const { appKey, appName } = environmentConfig.trello;

    const newTrelloRef = window.TrelloPowerUp.iframe({
        appKey,
        appName,
    });

    state.list = await newTrelloRef.list('id', 'name');
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
    state.episode = episode;
    state.list && (await updateListName('start', `${LIST_PREFIX}${state.list.name}`));
};

const stopBroadcasting = async () => {
    state.episode = null;
    state.list && (await updateListName('stop', state.list.name.replaceAll(LIST_PREFIX, '')));
};
</script>

<template>
    <p>
        Data: <code>{{ JSON.stringify(state, null, 2) }}</code>
    </p>

    <BroadcastingInProgress
        v-if="state.episode"
        :episode="state.episode"
        @stop="stopBroadcasting"
    />
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
