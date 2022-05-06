import { createApp, h } from 'vue';
import App from './App.vue'
import store from './store'


const app = createApp({
  render: () => h(App)
  });
app.use(store);
app.directive('focus',(el, binding) => {
  if (binding.value) el.focus()
})
app.mount("#app");
