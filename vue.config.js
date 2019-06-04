const path = require('path');
module.exports = {
    baseUrl: './',
    devServer: {
        proxy: {
            '/OilTrack': {
               target: 'http://192.168.3.77:8080/OilTrack', //服务器ip
                //target: 'http://192.168.3.3:8070/OilTrack',
                //target: 'http://192.168.3.6:8081/OilTrack', 
                changeOrigin: true, //是否允许跨越
                pathRewrite: {
                    '^/OilTrack': '/', //重写,
                }
            }
        }
    },
    configureWebpack: {
        externals: {
            "BMap": "BMap"
        }
    }
}
function resolve(dir) {
    return path.join(__dirname, dir)
}