const url = require("url");
const Layer = require("./Layer");
const Route = require("./Route");
class Router {
  constructor() {
    // 一个router实例中维护一个栈，栈中保存layer，而不是route
    this.stack = [];
  }
  // 为了让一个路径 可以接受不同的方法
  // Router中的layer负责匹配路径
  // Route中的layer负责处理函数
  // 我们可以获取到路径，也可以获取到一个针对路径的处理方法数组

  get(path, handlers) {
    //  需要创建 route ,把用户的处理函数放进去
    const route = this.createWrappedRoute(path);
    // router接受到了get，就传递给route的get方法
    route.get(handlers);
  }

  // 1. 负责创建一个route对象和一个layer对象，并关联
  // 2. layer进栈, 等路径匹配之后，由layer去调用route的dispatch方法去依次执行handler函数
  createWrappedRoute(path) {
    const route = new Route();
    // bind要注意绑在route上，而不是this上。
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    // layer进栈
    this.stack.push(layer);
    return route;
  }

  // 路由系统处理请求，需要匹配路径，然后匹配方法,不能直接依次for循环

  handleRequest(req, res, done) {
    const { pathname } = url.parse(req.url);
    // 这里的next是为了迭代外层的路径layer
    // 为什么不用for循环？ 因为路径的回调函数中，可能会有异步操作
    // 异步使用递归函数  同步使用循环
    let idx = 0;

    // 迭代路由layer
    const next = () => {
      if (idx >= this.stack.length) {
        // 必须要return 终止迭代
        return done();
      }
      const layer = this.stack[idx++];
      // 如果路径匹配了，调用handle 调用routes的dispatch方法

      if (layer.path === pathname) {
        // next是为了从route中layer跳出到外层路由的layer
        layer.handle(req, res, next);
      } else {
        // 如果路径不匹配，直接进入下一层layer
        next();
      }
    };
    next();
  }
}

module.exports = Router;
