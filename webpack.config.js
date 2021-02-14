const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const PATHS = {
   source: path.join(__dirname, 'source'),
   build: path.join(__dirname, 'build')
};


const common = {
   entry: {
      'index': PATHS.source + '/pages/index/index.js',
      'blog': PATHS.source + '/pages/blog/blog.js',
   },
   output: {
      path: PATHS.build,
      filename: './[name].js'
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: PATHS.source + '/pages/index/index.pug',
         filename: 'index.html',
         chunks: ['index']
      }),
      new HtmlWebpackPlugin({
         template: PATHS.source + '/pages/blog/blog.pug',
         filename: 'blog.html',
         chunks: ['blog']
      })
   ],
   module: {
      rules: [
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.pug$/i,
            loader: 'pug-loader',
            options: { pretty: true }
         },
         {
            test: /\.scss$/i,
            // include: paths,
            use: [
               'style-loader',
               'css-loader',
               'sass-loader'
            ]
         }
      ]
   }

};

const productionConfig = {
   mode: 'production'
};

const developmentConfig = {
   devServer: {
      stats: 'errors-only',
      port: 9000
   },
   mode: 'development'
};

module.exports = function (env) {

   if (env.production) {
      return Object.assign(
         {},
         common,
         productionConfig
      )
   }
   if (env.development) {
      return Object.assign(
         {},
         common,
         developmentConfig
      )
   }

};