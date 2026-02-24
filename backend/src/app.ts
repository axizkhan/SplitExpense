import express, { Application } from "express";
import { RouteHandler } from "./routes";
export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewareInitializer();
    this.routesInitializer();
    this.responseSenderInitializer();
    this.errorHandlerInitializer();
  }

  middlewareInitializer() {
    this.app.use(express.json());
  }
  routesInitializer() {
    const Routes = new RouteHandler();
    this.app.use("/api", Routes.Router);
  }
  responseSenderInitializer() {}
  errorHandlerInitializer() {}
}
