import { Router } from "express";
import { NoAuthRoutes } from "./noAuthRoutes";
import { AuthRoutes } from "./authRoutes";
import { IsUserExist } from "../middleware/isUserExistMiddleware";
export class RouteHandler {
    constructor() {
        this.Router = Router();
        this.noAuthRoutes = new NoAuthRoutes();
        this.authRoutes = new AuthRoutes();
        this.isUserExist = new IsUserExist();
        this.RouterInitializer();
    }
    RouterInitializer() {
        this.Router.use("/", this.noAuthRoutes.NoAuthRouter);
        this.Router.use("/auth", this.isUserExist.isUserExist, this.authRoutes.authRouter);
    }
}
