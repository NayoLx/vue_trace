module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			externals: ['ffi-napi', 'ref-napi']
		}
	},
	devServer: {
		host: '0.0.0.0',
		port: 8081,
		disableHostCheck: true,
		https: false, // 是否使用`https`协议。
		open: true, // 是否运行完成自动弹出浏览器界面。
		hotOnly: true, // 是否开启热更新。
		proxy: {
			"/api": {
				target: "http://39.108.117.149:8081/", // 
				changeOrigin: true,
				pathRewrite: {
					"^/api": "/"
				}
			},
		},
	},
};
