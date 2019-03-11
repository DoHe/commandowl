const { extendServer } = require('./src/server');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "node_modules/bulma/sass/utilities/_all.sass";
               @import "node_modules/bulma/sass/base/_all.sass";`,
      },
    },
  },
  pluginOptions: {
    ssr: {
      defaultTitle: 'Commandowl',
      favicon: './public/favicon.ico',
      extendServer,
    },
  },
};
