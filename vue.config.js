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
      port: process.env.PORT || 9000,
      defaultTitle: 'Commandowl',
      favicon: './public/favicon.ico',
    },
  },
};
