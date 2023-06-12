const express = require("express");
const app = express();
const port = 3000;

const connect = require("./schemas");
connect();

app.use(express.json());

// const goodsRouter = require("./routes/goods");
// const cartsRouter = require("./routes/carts");
// app.use("/api", [goodsRouter, cartsRouter]);

app.get("/", (req, res) => {
  res.send("hello, world!");
});

app.listen(port, () => {
  console.log(port, "포트: 서버열림");
});
