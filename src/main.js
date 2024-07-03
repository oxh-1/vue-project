import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/index.css';  // Import the global CSS

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');


import { ref, watch } from 'vue';

let aiActive = ref(false);

// Watcher for aiActive changes
watch(aiActive, (newVal) => {
  if (newVal) {
    aiPlay();
  }
});
createApp(APP).use(router).mount('#app');