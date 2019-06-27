const baseUrl = '/'
module.exports = {
  // 根据你的实际情况更改这里
  baseUrl: baseUrl,
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  lintOnSave: false,
  devServer: {
    port: 8025,
    publicPath: baseUrl, // 和 baseUrl 保持一致
    proxy: {
      // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
      '/api/*': {
        target: 'http://guowenzhuang.notr.tech:8001',
        secure: false, // 接受 运行在 https 上的服务
        changeOrigin: true
      }
    },
     disableHostCheck: true

  },
  publicPath: process.env.NODE_ENV === 'codingme' ? '/jushi-web-vant/dist' : '/'

}
