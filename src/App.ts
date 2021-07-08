import express from 'express';
import path from "path";
import router from "./routes";

class App {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.applyMiddlewares();
    this.applyRouter();
  }

  private applyMiddlewares() {
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.set("view engine", "ejs");

    this.app.use(express.static(__dirname + "/public"));
  }

  private applyRouter() {
    this.app.use("/", router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`------ server started http://localhost:${this.port} ------`);
    })
  }

}

export default App;