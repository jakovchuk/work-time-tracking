import { createApp, h } from 'vue';
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp({
  render: () => h(App)
  });
app.use(pinia)
app.mount("#app");
