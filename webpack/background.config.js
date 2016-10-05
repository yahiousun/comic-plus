const path = require('path');

module.exports = {

  entry: [
    './src/background/scripts/index.js'
  ],

  output: {
    filename: 'background.js',
    path: path.join(__dirname, '../', 'build')
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
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
      }
    ]
  }
};
