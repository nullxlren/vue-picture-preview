const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');
// const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const config = require("./build/config");
module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: '/',

  // where to output built files
  outputDir: 'dist',

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: true,

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  compiler: false,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: ( config ) => {
    if (process.env.NODE_ENV === 'production') {
      // config.plugin('copy-webpack-plugin')
      // .use(CopyWebpackPlugin,
      //   [
      //       [{
      //           from: path.resolve(__dirname, 'public','static'),
      //           to: path.resolve(__dirname, 'dist'),
      //           ignore: ['.*']
      //       }]
      //   ]
      // );
    }

  },
  configureWebpack: (config) => {
    //config.entry
    let output = {
        path: config.output.path,
        publicPath: config.output.publicPath,
        filename: 'vue-picture-preview.min.js',
        library: 'VuePicturePreview',
        libraryTarget: 'umd'
    }
    let plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false
            }
          },
          sourceMap: true,
          parallel: true
        }),
        new ExtractTextPlugin({
          filename: 'vue-picture-preview.min.css',
          // filename: utils.assetsPath('css/[name].[contenthash].css'),
          // Setting the following option to `false` will not extract CSS from codesplit chunks.
          // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
          // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
          // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
          allChunks: true,
        }),
        new OptimizeCSSPlugin({
          cssProcessorOptions: true
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),
    ]
    if (process.env.NODE_ENV === 'production') {
        config.output = output;
        config.plugins = plugins;
    } else {
    }
    // console.log(JSON.stringify(config.plugins,null,2),config,"config", config.entry)
  },

  // vue-loader options
  // https://vue-loader.vuejs.org/en/options.html
  vueLoader: {},

  // generate sourceMap for production build?
  productionSourceMap: false,

  // CSS related options
  css: {
    // extract CSS in components into a single CSS file (only in production)
    extract: true,

    // enable CSS source maps?
    sourceMap: false,

    // pass custom options to pre-processor loaders. e.g. to pass options to
    // sass-loader, use { sass: { ... } }
    loaderOptions: {},

    // Enable CSS modules for all css / pre-processor files.
    // This option does not affect *.vue files.
    modules: false
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  // split vendors using autoDLLPlugin?
  // can also be an explicit Array of dependencies to include in the DLL chunk.
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  dll: false,

  // options for the PWA plugin.
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // configure webpack-dev-server behavior
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: null, // string | Object
    before: app => {}
  },

  // options for 3rd party plugins
  pluginOptions: {
    // ...
  }
}
