import { createApp } from './main';

export default context => new Promise(async (resolve, reject) => {
  const {
    app,
    router,
  } = await createApp();

  router.push(context.url);

  router.onReady(() => {
    // eslint-disable-next-line no-param-reassign
    context.rendered = () => {

    };
    resolve(app);
  }, reject);
});
