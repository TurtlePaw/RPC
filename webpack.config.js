/*
  ONLY RUN BUILDS WITH `npm run web-dist`!
  DO NOT USE NORMAL WEBPACK! IT WILL NOT WORK!
*/

const webpack = require('webpack');
const createVariants = require('parallel-webpack').createVariants;
const version = require('./package.json').version;

const createConfig = (options) => {
  const plugins = [
    new webpack.DefinePlugin({ 'global.GENTLY': false })
  ];

  if (options.minify) plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));

  return {
    entry: './src/index.js',
    output: {
      path: __dirname,
      filename: `./webpack/rpc.${version}${options.minify ? '.min' : ''}.js`
    },
    module: {
      loaders: [
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.md$/, loader: 'ignore-loader' },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    node: {
      fs: 'empty',
      tls: 'empty',
      __dirname: true
    },
    plugins
  };
};

module.exports = createVariants({}, { minify: [false, true] }, createConfig);