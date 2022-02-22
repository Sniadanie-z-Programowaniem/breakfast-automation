<script setup lang="ts">
import { ref } from 'vue';
import { EpisodeBroadcast } from './types';

type EpisodeBroadcastForm = Partial<EpisodeBroadcast>;

const emit = defineEmits<{
    (e: 'started', episode: EpisodeBroadcast): void;
}>();
const form = ref<EpisodeBroadcastForm>({});

const submitForm = () => {
    console.log(form.value);
    emit('started', form.value as EpisodeBroadcast);
};
</script>

<template>
    <h3>Start broadcasting</h3>
    <form @submit.prevent="submitForm">
        <div class="container">
            <div>
                <input
                    type="radio"
                    id="frontend"
                    name="type"
                    value="frontend"
                    v-model="form.type"
                    required
                />
                <label for="frontend">💅 Frontend</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="backend"
                    name="type"
                    value="backend"
                    v-model="form.type"
                    required
                />
                <label for="backend">🪲 Backend</label>
            </div>

            <div class="container">
                <label for="number">📝 Episode number</label>
                <input type="number" id="number" v-model="form.number" required />
            </div>

            <div class="container">
                <label for="streamUrl">🤳 Stream URL</label>
                <input type="url" id="streamUrl" v-model="form.streamUrl" required />
            </div>

            <button type="submit">Go!</button>
        </div>
    </form>
</template>

<style scoped>
label {
    display: inline;
}
</style>
