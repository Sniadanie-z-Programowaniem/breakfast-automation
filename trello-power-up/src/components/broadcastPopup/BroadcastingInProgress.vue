<script setup lang="ts">
import { EpisodeBroadcast } from './types';
defineProps<{
    episode: EpisodeBroadcast;
}>();
const emit = defineEmits<{
    (e: 'stop'): void;
}>();
</script>

<template>
    <div class="container">
        <h3>🎙 Broadcasting</h3>
        <p><b>Type:</b> {{ episode.type }}</p>
        <p><b>Number</b> #{{ episode.number }}</p>
        <p>
            <a :href="episode.streamUrl" target="_blank" rel="noopener noreferrer">{{
                episode.streamUrl
            }}</a>
        </p>
        <button @click="() => emit('stop')">Stop broadcasting</button>
    </div>
</template>
