const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function proxy(app) {
  app.use(
    createProxyMiddleware("/naverApi", {
      target: "https://openapi.naver.com",
      pathRewrite: { "^/naverApi": "" },
      changeOrigin: true,
    }),
  );
};
