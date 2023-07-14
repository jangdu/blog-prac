import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/index.js";

class App {
  private app = express();
  private port = 3000 || process.env.SERVER_PORT;

  constructor() {
    this.setup();
    this.routes();
  }

  private setup(): void {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json("blog-api");
    });
    // this.app.use(router);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(this.port, "포트: 서버열림");
    });
  }
}

export default App;
