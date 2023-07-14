import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const routes = require("./routes/index");
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.json("blog-api");
});

app.listen(port, () => {
  console.log(port, "포트: 서버열림");
});
