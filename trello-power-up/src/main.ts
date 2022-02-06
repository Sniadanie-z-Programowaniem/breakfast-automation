import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import BroadcastPopup from './components/BroadcastPopup.vue';
import InitializePowerUp from './components/InitializePowerUp.vue';
import { createApp } from 'vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: InitializePowerUp,
        },
        {
            path: '/broadcast-popup',
            component: BroadcastPopup,
        },
    ],
});

createApp(App).use(router).mount('#app');
