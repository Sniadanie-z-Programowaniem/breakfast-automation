<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Trello } from '../../typings/trello';
import { environmentConfig } from '../configuration';
import { getTrelloApiService } from '../services/trello';
import { ApiResponse } from '../services/types';

type ListParams = {
    id: string;
    name: string;
};

defineProps<{ msg: string }>();

const state = reactive<{ list: ListParams | null }>({
    list: null,
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
    response: ApiResponse<unknown>,
    trello: Trello.PowerUp.IFrame = iframeInstance(),
) => {
    switch (response.state) {
        case 'error':
            trello.alert({
                display: 'error',
                message: `❌ Cannot start broadcasting:\n${response.error}`,
            });
            break;
        case 'success':
            trello.alert({
                display: 'success',
                message: `Started broadcasting news from list "${state.list?.name}"`,
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

const startBroadcasting = async () => {
    state.list?.id &&
        notifyUser(
            await getTrelloApiService().lists.update(state.list.id, {
                name: `[ Rec:🔴 ] ${state.list.name}`,
            }),
        );
};
</script>

<template>
    <h1>{{ msg || 'Stub!' }}</h1>
    <h2>
        Data: <code>{{ JSON.stringify(state, null, 2) }}</code>
    </h2>

    <button @click="startBroadcasting()">🔴 Start broadcasting</button>
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
