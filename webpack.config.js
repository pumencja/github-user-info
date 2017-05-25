var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    target: "web",
    // extensions that are used
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ],  
};