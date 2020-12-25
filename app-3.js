const express = require("./express");
// 默认情况下，express()只是创建了一个应用，本身不应该携带一个路由系统
// 所以我们用到了路由懒加载，只有在app.get或者listen的时候才会去添加路由系统
const app = express();

console.log(app);
// 由于两件事的操作是异步的，我们想要一件事做完之后再做另外一件事, 和连续两次 fs.readFile一样

// express是通过回调函数的方式，koa使用了promise
// 由于一些操作是异步的，我们通过这种方式，可以在一件事完成之后，通过next()再去进入到下一件事

app.get(
  "/",
  function (req, res, next) {
    console.log("get fn1");
    res.write("GET 1111");
    next();
  },
  function (req, res, next) {
    console.log("get fn2");
    res.end("GET 2222");
    // next();
  }
);

app.post("/", function (req, res, next) {
  res.end("post");
});

app.put("/", function (req, res, next) {
  res.end("put");
});
app.delete("/", function (req, res, next) {
  res.end("delete");
});

app.listen(3000, () => {
  console.log("start on http://localhost:3000 !");
});
