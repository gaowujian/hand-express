const http = require("http");
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
function createApplication() {
  return {
    get: function (path, handler) {
      routes.push({
        path,
        method: "get",
        handler,
      });
    },
    listen: function (...args) {
      const server = http.createServer((req, res) => {
        const { pathname } = new URL(req.url, `http://${req.headers.host}`);
        const requestMethod = req.method.toLocaleLowerCase();
        for (let i = 0; i < routes.length; i++) {
          const { path, method, handler } = routes[i];
          //  路由就是路径和方法都匹配
          if (path === pathname && method === requestMethod) {
            return handler(req, res);
          }
        }
        // 如果的都匹配不到，就走默认路由
        routes[0].handler(req, res);
      });
      server.listen(...args);
    },
  };
}

module.exports = createApplication;
