const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: [
        __dirname + '/app/app.js',
        __dirname + '/assets/app.scss'
    ]},
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract(
                ['css-loader', 'sass-loader']
            )
        }],
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/node_modules/open-iconic/sprite/open-iconic.svg',
                to: __dirname + '/dist/open-iconic.svg'
            }
        ])
    ],
    target: 'node',
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".json", ".jsx"]
    }
}