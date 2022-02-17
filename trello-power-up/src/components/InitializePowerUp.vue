<script setup lang="ts">
import { onMounted } from 'vue';
import { initializePowerUpWithCapabilities } from '../capabilities';

onMounted(() => {
    console.log('Trello power-up initialized');
    initializePowerUpWithCapabilities();
});
</script>
