const { extendServer } = require('./src/server');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "node_modules/bulma/bulma.sass";',
      },
    },
  },
  configureWebpack: {
  },
  pluginOptions: {
    ssr: {
      defaultTitle: 'Commandowl',
      favicon: './public/favicon.ico',
      extendServer,
    },
  },
};
