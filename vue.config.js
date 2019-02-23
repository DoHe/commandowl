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
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.whitespace = 'condense';
        return options;
      });
  },
  pluginOptions: {
    ssr: {
      port: 9000,
      defaultTitle: 'Commandowl',
      favicon: './public/favicon.ico',
    },
  },
};
