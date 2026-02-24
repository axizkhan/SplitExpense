import { Router } from "express";

export class RouteHandler {
  public Router: Router;
  constructor() {
    this.Router = Router();
    this.RouterInitializer();
  }

  private RouterInitializer() {}
}
