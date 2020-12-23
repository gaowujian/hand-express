const Router = require("./Router");
const http = require("http");
const routes = [
  {
    path: "*",
    method: "all",
    handler: function (req, res) {
      res.end(`${req.url}is not found`);
    },
  },
];

class Application {
  constructor() {
    //   每一个应用都有一个自己独立的路由系统
    this._routes = routes;
  }

  get(path, handler) {
    this._routes.push({
      path,
      method: "get",
      handler,
    });
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      const { pathname } = new URL(req.url, `http://${req.headers.host}`);
      const requestMethod = req.method.toLocaleLowerCase();
      for (let i = 0; i < this._routes.length; i++) {
        const { path, method, handler } = this.routes[i];
        //  路由就是路径和方法都匹配
        if (path === pathname && method === requestMethod) {
          return handler(req, res);
        }
      }
      // 如果的都匹配不到，就走默认路由
      this._routes[0].handler(req, res);
    });
    server.listen(...args);
  }
}

module.exports = Application;
