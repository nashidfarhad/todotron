const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            __dirname + '/app/app.js',
            __dirname + '/assets/app.scss'
        ]
    },
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
        new ExtractTextPlugin('style.css')
    ],
    target: 'node',
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".json", ".jsx"]
    },
    externals: [
        (function () {
            var IGNORES = [
                'electron'
            ];
            return function (context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, "require('" + request + "')");
                }
                return callback();
            };
        })()
    ]
}