const Router = require("./Router");
const http = require("http");

class Application {
  constructor() {
    //   每一个应用都有一个自己独立的路由系统
    this._router = new Router();
  }

  get(path, ...handlers) {
    this._router.get(path, handlers);
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      // 如果路由系统处理不了，告诉app，放在这里由app来处理，主要是为了职责划分
      function done() {
        res.end(`${req.url}is not found`);
      }
      // 把请求和返回的任务交给路由系统去处理
      this._router.handleRequest(req, res, done);
    });
    server.listen(...args);
  }
}

module.exports = Application;
