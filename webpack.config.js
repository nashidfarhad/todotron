module.exports = {
    entry: __dirname + '/app/app.js',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist'
    },
    target: 'node',
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".json", ".jsx"]
    }
}
