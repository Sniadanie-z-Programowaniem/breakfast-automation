<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    console.log('Trello power-up initialized');

    window.TrelloPowerUp.initialize({
        'list-actions': (trello) => [
            {
                text: 'hello!',
                callback: async (trello) => {
                    trello.alert({
                        display: 'success',
                        duration: 3,
                        message: 'It works!',
                    });
                },
            },
            {
                text: 'show me popup2',
                callback: async (trello) => {
                    trello.popup({
                        title: 'Start broadcasting',
                        url: '/broadcast-popup',
                    });
                },
            },
        ],
    });
});
</script>
