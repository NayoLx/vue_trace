module.exports = {
  devServer: {
    port: 8081,
    disableHostCheck: true,
    https: false, // 是否使用`https`协议。
    open: true, // 是否运行完成自动弹出浏览器界面。
    hotOnly: true, // 是否开启热更新。
    proxy: {
      "/api": {
        target: "http://172.31.41.83:8081/", // 你的API服务器地址
        changeOrigin: true,
        pathRewrite: { "^/api": "/" }
      },
    },
  },
};