const url = require("url");
const Layer = require("./Layer");
const Route = require("./Route");
const methods = require("methods");

function Router() {
  this.stack = [];
}

methods.forEach((method) => {
  Router.prototype[method] = function (path, handlers) {
    //  需要创建 route ,把用户的处理函数放进去
    const route = this.createWrappedRoute(path);
    // router接受到了get，就传递给route的get方法
    route[method](handlers);
  };
});

Router.prototype.createWrappedRoute = function (path) {
  const route = new Route();
  // bind要注意绑在route上，而不是this上。
  const layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  // layer进栈
  this.stack.push(layer);
  return route;
};

Router.prototype.handleRequest = function (req, res, done) {
  const { pathname } = url.parse(req.url);
  // 这里的next是为了迭代外层的路径layer
  // 为什么不用for循环？ 因为路径的回调函数中，可能会有异步操作
  // 异步使用递归函数  同步使用循环
  let idx = 0;
  // console.log("request is coming ");
  // 迭代路由layer
  const next = () => {
    if (idx >= this.stack.length) {
      // 必须要return 终止迭代
      return done();
    }
    const layer = this.stack[idx++];
    // 如果路径匹配了，调用handle 调用routes的dispatch方法
    // 优化策略，在进入一个layer之前，还要看是否支持该方法，不支持直接跳到下一层
    const method = req.method.toLowerCase();
    if (layer.match(pathname) && layer.route.methods[method]) {
      // next是为了从route中layer跳出到外层路由的layer
      layer.handle(req, res, next);
    } else {
      // 如果路径不匹配，直接进入下一层layer
      next();
    }
  };
  next();
};

module.exports = Router;
