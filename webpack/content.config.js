const path = require('path');

module.exports = {

  entry: [
    './src/content/scripts/index.js'
  ],

  output: {
    filename: 'content.js',
    path: path.join(__dirname, '../', 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, '../', 'src'),
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]_[local]',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      }
    ]
  }
};
