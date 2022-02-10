<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Trello } from '../../typings/trello';
import { environmentConfig } from '../configuration';
import { getTrelloApiService } from '../services/trello';

type ListParams = {
    id: string;
    name: string;
};

defineProps<{ msg: string }>();

const trello = ref<Trello.PowerUp.IFrame | null>(null);
const state = reactive<{ list: ListParams | null }>({
    list: null,
});

onMounted(async () => {
    const { appKey, appName } = environmentConfig.trello;

    const newTrelloRef = window.TrelloPowerUp.iframe({
        appKey,
        appName,
    });

    trello.value = newTrelloRef;

    state.list = await newTrelloRef.list('id', 'name');
});

const startBroadcasting = () => {
    state.list?.id &&
        trello.value &&
        getTrelloApiService(trello.value).lists.update(state.list.id, {
            name: `[Rec:🔴]${state.list.name}`,
        });
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
