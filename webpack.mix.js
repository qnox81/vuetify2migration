const mix = require('laravel-mix')
// require('laravel-mix-bundle-analyzer')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .options({
    postCss: [
      require('autoprefixer')
    ]
  })
  .js('resources/js/app.js', 'public/js')
  .sass('resources/styles/app.sass', 'public/css')
  .sourceMaps()
  .copyDirectory('resources/img', 'public/img')
  .copyDirectory('resources/assets', 'public')
  .browserSync({
    proxy: 'vuetify2migration.test'
  })

if (mix.inProduction()) {
  mix
    .version()
    .extract()
}

// if (!mix.inProduction()) {
//   mix.bundleAnalyzer({
//     analyzerHost: '0.0.0.0',
//     openAnalyzer: false
//   })
// }

mix.webpackConfig({
  plugins: [
    new VuetifyLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.join(__dirname, './resources/js')
    }
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: mix.config.babel()
      }]
    }]
  },
  watchOptions: {
    aggregateTimeout: 2000,
    poll: 2000,
    ignored: /node_modules/
  }
})
