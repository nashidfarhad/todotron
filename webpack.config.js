module.exports = {
  entry: __dirname + '/app.js',
  node:{
    __filename:true,
    __dirname:true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  output:{
    filename:'app.bundle.js',
    path:__dirname+'/dist'
  },
  target:'node'
}
