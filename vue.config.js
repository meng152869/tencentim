const path = require("path");
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/tim/'  : '/',
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',
        port: 9000
    }
}