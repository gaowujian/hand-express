const Layer = require("./Layer");
const methods = require("methods");

function Route() {
  this.stack = [];
}

methods.forEach((method) => {
  Route.prototype[method] = function (handlers) {
    handlers.forEach((handler) => {
      const layer = new Layer("*", handler);
      layer.method = method;
      this.stack.push(layer);
    });
  };
});

Route.prototype.dispatch = function (req, res, done) {
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
    } else {
      next();
    }
  };
  next();
};

module.exports = Route;
