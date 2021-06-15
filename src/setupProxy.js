const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/cms',
    createProxyMiddleware({
      target: 'https://finn-van-den-ijssel-api.herokuapp.com/',
      changeOrigin: true,
    })
  );
};