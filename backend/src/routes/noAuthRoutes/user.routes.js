import { Router } from "express";
import { UserAuthController } from "../../controller/userAuth.controller";
export class UserRoute {
    constructor() {
        this.UserRouter = Router();
        this.userAuthController = new UserAuthController();
        this.UserRouterInitilizer();
    }
    UserRouterInitilizer() {
        this.UserRouter.post("/signup-local", this.userAuthController.userLocalSignup);
        this.UserRouter.post("/login-local", this.userAuthController.userLocalLogin);
    }
}
