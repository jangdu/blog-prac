import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

import routes from "./routes/index.js";
app.use(routes);

app.get("/", (req, res) => {
  res.json("blog-api");
});

app.listen(port, () => {
  console.log(port, "포트: 서버열림");
});
