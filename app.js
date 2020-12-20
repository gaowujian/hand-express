const express = require("./express");
const app = express();

// 在没有express之前，我们都是通过对req.url的pathname进行不同资源的处理并返回
// 这个概念就是路由
// 在请求和相应中间，可以做一些事，这叫做中间件

app.get("/", function (req, res) {
  res.end("///");
});
app.get("/login", function (req, res) {
  res.end("loging");
});

// all表示，不管是什么方法，都可以匹配到这个路径
// 星号* 表示不管是什么路径都可以匹配
// 可以用来兜底执行

// app.all("*", (req, res) => {
//   res.end(req.url + "404");
// });

app.listen(3000, () => {
  console.log("start on 3000!");
});
1;
