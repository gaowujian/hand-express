const express = require("./express");
const app = express();

app.get("/", function (req, res) {
  res.end("home ");
});
app.get("/login", function (req, res) {
  res.end("login");
});

//你别看我之前一直get，其实跟发布订阅一样，我先缓存了路径和处理函数
//等我listen之后，才算正式启动服务器，处理来的请求

app.listen(3000, () => {
  console.log("start on http://localhost:3000 !");
});
