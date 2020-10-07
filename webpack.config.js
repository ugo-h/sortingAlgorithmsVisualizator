const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
        hot: true
    }
}