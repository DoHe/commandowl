import Vue from 'vue';
import App from './App.vue';
import createStore from './store';

Vue.config.productionTip = false;

export async function createApp({
  beforeApp = () => {},
  afterApp = () => {},
  context,
} = {}) {
  await beforeApp({ context });

  Vue.directive('focus', {
    inserted(el) {
      el.focus();
    },
  });

  const store = createStore();
  const app = new Vue({
    store,
    render: h => h(App),
  });

  const result = {
    app,
    store,
  };

  await afterApp(result);

  return result;
}
