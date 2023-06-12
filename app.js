const express = require("express");
const app = express();
const port = 3000;

const connect = require("./schemas");
connect();

app.use(express.json());

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("hello, world!");
});

app.listen(port, () => {
  console.log(port, "포트: 서버열림");
});
