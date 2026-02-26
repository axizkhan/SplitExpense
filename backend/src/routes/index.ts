import { Router } from "express";
import { UserRoute } from "./noAuthRoutes/user.routes";
import { NoAuthRoutes } from "./noAuthRoutes";

export class RouteHandler {
  public Router: Router;
  private noAuthRoutes: NoAuthRoutes;
  constructor() {
    this.Router = Router();
    this.noAuthRoutes = new NoAuthRoutes();
    this.RouterInitializer();
  }

  private RouterInitializer() {
    this.Router.use("/", this.noAuthRoutes.NoAuthRouter);
  }
}
