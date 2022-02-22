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
    <h3>🔴 Broadcasting</h3>
    <p>
        {{ episode.type }} | Ep #<b>{{ episode.number }}</b>
    </p>
    <button @click="() => emit('stop')">Stop broadcasting</button>
</template>
