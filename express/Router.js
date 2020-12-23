const url = require("url");
class Router {
  constructor() {
    this._routes = [];
  }
  get(path, handler) {
    this._routes.push({
      path,
      method: "get",
      handler,
    });
  }
  handleRequest(req, res, done) {
    const { pathname } = url.parse(req.url);
    const requestMethod = req.method.toLocaleLowerCase();
    for (let i = 0; i < this._routes.length; i++) {
      const { path, method, handler } = this._routes[i];
      //  路由就是路径和方法都匹配
      if (path === pathname && method === requestMethod) {
        return handler(req, res);
      }
    }
    // 如果的都匹配不到，告诉app去处理
    done();
  }
}

module.exports = Router;
