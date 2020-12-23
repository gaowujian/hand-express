const url = require("url");
const routes = [
  {
    path: "*",
    method: "all",
    handler: function (req, res) {
      res.end(`${req.url}is not found`);
    },
  },
];

class Router {
  constructor() {
    this._routes = routes;
  }
  get(path, handler) {
    this._routes.push({
      path,
      method: "get",
      handler,
    });
  }
  handle(req, res) {
    const { pathname } = url.parse(req.url);
    const requestMethod = req.method.toLocaleLowerCase();
    for (let i = 0; i < this._routes.length; i++) {
      const { path, method, handler } = this._routes[i];
      //  路由就是路径和方法都匹配
      if (path === pathname && method === requestMethod) {
        return handler(req, res);
      }
    }
    // 如果的都匹配不到，就走默认路由
    this._routes[0].handler(req, res);
  }
}

module.exports = Router;
