const Router = require("./Router");
const http = require("http");

class Application {
  constructor() {
    //   每一个应用都有一个自己独立的路由系统
    this.router = new Router();
  }

  get(path, handler) {
    // 把处理路径的任务交给路由类去处理
    this.router.get(path, handler);
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      // 把请求和返回的任务交给路由系统去处理
      this.router.handle(req, res);
    });
    server.listen(...args);
  }
}

module.exports = Application;
