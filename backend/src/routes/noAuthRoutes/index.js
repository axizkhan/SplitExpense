import { Router } from "express";
import { UserRoute } from "./user.routes";
export class NoAuthRoutes {
    constructor() {
        this.NoAuthRouter = Router();
        this.userRouter = new UserRoute();
        this.RouterInitializer();
    }
    RouterInitializer() {
        this.NoAuthRouter.use("/user", this.userRouter.UserRouter);
    }
}
