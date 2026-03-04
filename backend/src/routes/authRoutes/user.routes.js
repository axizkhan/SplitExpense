import { Router } from "express";
import { UserController } from "../../controller/user.controller";
export class UserRouter {
    constructor() {
        this.userRouter = Router();
        this.userController = new UserController();
        this.RouteInitializer();
    }
    RouteInitializer() {
        this.userRouter.get("/", this.userController.getAllGroup);
    }
}
