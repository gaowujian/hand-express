const Layer = require("./Layer");

class Route {
  constructor() {
    // 维护处理方法
    this.stack = [];
  }
  get(handlers) {
    handlers.forEach((handler) => {
      const layer = new Layer("*", handler);
      layer.method = "get";
      this.stack.push(layer);
    });
  }

  // done是为了router层面的layer进行跳转
  dispatch(req, res, done) {
    const requestMethod = req.method.toLocaleLowerCase();
    let idx = 0;
    // 迭代用户的处理方法layer
    const next = () => {
      if (idx >= this.stack.length) {
        // 必须要return 终止迭代
        return done();
      }
      const layer = this.stack[idx++];
      if (layer.method === requestMethod) {
        layer.handle(req, res, next);
      }
    };
    next();

    // for (let i = 0; i < this.stack.length; i++) {
    //   const { path, method, handler } = this.stack[i];
    //   //  路由就是路径和方法都匹配
    //   if (path === pathname && method === requestMethod) {
    //     return handler(req, res);
    //   }
    // }
  }
}

module.exports = Route;
