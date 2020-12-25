const Router = require("./Router");
const http = require("http");
const methods = require("methods");

function Application() {
  this._router = new Router();
}

methods.forEach((method) => {
  Application.prototype[method] = function (path, ...handlers) {
    this._router[method](path, handlers);
  };
});

Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    // 如果路由系统处理不了，告诉app，放在这里由app来处理，主要是为了职责划分
    function done() {
      res.end(`${req.url}is not found`);
    }
    // 把请求和返回的任务交给路由系统去处理
    this._router.handleRequest(req, res, done);
  });
  server.listen(...args);
};

module.exports = Application;
