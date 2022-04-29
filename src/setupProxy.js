const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://gmall-h5-api.atguigu.cn',
      changeOrigin: true,
    })
  );
};