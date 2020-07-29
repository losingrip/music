// 配置文件  完成时运行npm run build 打包上线会生成一个Dist文件夹,在js文件夹下面有map映射文件可以在配置文件中取消
const path = require('path')//下面要用到Path变量,先从node 获取
module.exports = {
    //配置是否打包map文件
    productionSourceMap: false,

    //配置输出的文件夹目录
    outputDir: './myMusicApp',

    //上线以后 请求的css文件和js文件等不是在根目录下,可以设置自己请求的地址
    publicPath: 'myMusicApp/',


    // 配置跨域处理
    devServer: {
        proxy: {
            "/Api": {
                target: "http://tingapi.ting.baidu.com", // target host
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {
                    "^/Api": "" // rewrite path
                }
            },
            '148.70.235.174': {//具体请求的地址
                target: '148.70.235.174'//将localhost代理的地址,访问的localhost,通过target代理,将地址改变为target地址
            }
        }
    }
}





