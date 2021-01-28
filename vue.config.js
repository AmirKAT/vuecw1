module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuecw1/'
    : '/',
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/api" }
      }
    },

  },
}