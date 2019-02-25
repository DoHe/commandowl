// eslint-disable-next-line import/no-extraneous-dependencies
import { createApp } from './main';

createApp({
  afterApp({ app, store }) {
    // eslint-disable-next-line no-underscore-dangle
    if (window.__INITIAL_STATE__) {
      // eslint-disable-next-line no-underscore-dangle
      store.replaceState(window.__INITIAL_STATE__);
    }
    app.$mount('#app');
  },
});
