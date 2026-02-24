import { App } from "../app";
import http from "http";
import mongoose from "mongoose";

export class Server {
  private SERVER: http.Server;
  private PORT: number | string;

  constructor(port: number | string) {
    const appInstance = new App();
    this.PORT = port;
    this.SERVER = http.createServer(appInstance.app);
  }

  async start() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/splitWise");
      this.SERVER.listen(this.PORT, () => {
        console.log(`Server is listening to port ${this.PORT}`);
      });
    } catch (err) {
      throw err;
    }
  }
}
