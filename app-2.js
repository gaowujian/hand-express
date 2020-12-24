const express = require("./express");
const app = express();

// 由于两件事的操作是异步的，我们想要一件事做完之后再做另外一件事, 和连续两次 fs.readFile一样

// express是通过回调函数的方式，koa使用了promise
// 由于一些操作是异步的，我们通过这种方式，可以在一件事完成之后，通过next()再去进入到下一件事

app.get(
  "/",
  function (req, res, next) {
    console.log("function1");
    res.write("love you ");
    // res.end("gg");
    next();
  },
  function (req, res, next) {
    console.log("function2");
    res.end("home page");
    next();
  }
);
app.get("/", function (req, res, next) {
  console.log("function3");
});

app.listen(3000, () => {
  console.log("start on http://localhost:3000 !");
});
