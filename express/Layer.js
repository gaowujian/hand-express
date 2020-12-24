// layer 用来包裹中间件，route属性，表明包裹的是路由中间件

// express由一种写法是
// app.route("/").get().post().delete() 这种和 app.get("/",fn(){},fn(){},fn(){})不同
// 第一情况，一个layer可能会有多种不同的方法，而第二种是不存在这种情况，全部是get

function Layer(path, handle) {
  //用于外层的layer,匹配路径
  this.path = path;
  this.route = null;

  //用于内层的layer,处理请求
  this.method = null;

  // 用于处理请求，可能是为了匹配路径，也可能是为了匹配方法
  this.handle = handle;
}

module.exports = Layer;

// 最开始的路由系统

// if (path === pathname && method === requestMethod) {
//   return handler(req, res);
// }

// 改进后，把匹配路径和匹配方法责任划分给了router和route，而不是在一个地方处理

// router中
// if (layer.path === pathname) {
//   layer.handle(req, res, next);
// } else {
//   next();
// }

// route中
// if (layer.method === requestMethod) {
//   layer.handle(req, res, next);
// }
