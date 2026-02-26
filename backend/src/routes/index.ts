import { Router } from "express";
import { UserRoute } from "./noAuthRoutes/user.routes";
import { NoAuthRoutes } from "./noAuthRoutes";
import { AuthRoutes } from "./authRoutes";

export class RouteHandler {
  public Router: Router;
  private noAuthRoutes: NoAuthRoutes;
  private authRoutes: AuthRoutes;
  constructor() {
    this.Router = Router();
    this.noAuthRoutes = new NoAuthRoutes();
    this.authRoutes = new AuthRoutes();
    this.RouterInitializer();
  }

  private RouterInitializer() {
    this.Router.use("/", this.noAuthRoutes.NoAuthRouter);
    this.Router.use("/auth", this.authRoutes.AuthRouter);
  }
}
