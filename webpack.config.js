const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
   source: path.join(__dirname, 'source'),
   build: path.join(__dirname, 'build')
};

module.exports = {
   entry: {
      'index': PATHS.source + '/pages/index/index.js',
      'blog': PATHS.source + '/pages/blog/blog.js',
   },
   output: {
      path: PATHS.build,
      filename: './js/[name].js'
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: PATHS.source + '/pages/index/index.pug',
         filename: 'index.html',
         chunks: ['index']
      }),
      new HtmlWebpackPlugin({
         template: PATHS.source + '/pages/blog/blog.pug',
         filename: 'blog.html',
         chunks: ['blog']
      }),

   ],
   module: {
      rules: [
         {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
               pretty: true
            }
         }
      ]
   }

};