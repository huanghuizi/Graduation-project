let path = require("path")

module.exports = {
  publicPath: "./",
  outputDir: "./dockerfiles/dist",
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      "^/api": {
        target: "http://192.168.20.74:8090",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}
