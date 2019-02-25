import { createApp } from './main';

export default context => new Promise(async (resolve) => {
  await createApp({
    context,
    afterApp({ app, store }) {
      // eslint-disable-next-line no-param-reassign
      context.rendered = () => {
        // eslint-disable-next-line no-param-reassign
        context.state = store.state;
      };
      resolve(app);
    },
  });
});
