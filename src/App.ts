import express from 'express';
import { createServer, Server } from "http";
import * as socketio from 'socket.io';
import path from "path";
import router from "./routes";

class App {
  private app: express.Application;
  private server: Server;
  private port: number;
  private io: socketio.Socket;
  private lists;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.server = createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.connetion();
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
    this.server.listen(this.port, () => {
      console.log(`------ server started http://localhost:${this.port} ------`);
    })
  }

  public connetion() {
    this.io.on('connection', (socket) => {
      // 접속시 현재 생성된 list 전송
      socket.emit('get-lists', this.lists);

      // list,card 수정 시 수정한 client 외 모든 client에게 데이터 전송
      socket.on('send-lists', (data) => {
        this.lists = data;
        socket.broadcast.emit('get-lists', data);
      });

    });
  }
}

export default App;