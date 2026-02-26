import { Router } from "express";
import { UserAuthController } from "../../controller/userAuth.controller";
import passport from "passport";
export class UserRoute {
  public UserRouter: Router;
  private userAuthController: UserAuthController;
  constructor() {
    this.UserRouter = Router();
    this.userAuthController = new UserAuthController();
    this.UserRouterInitilizer();
  }
  private UserRouterInitilizer() {
    this.UserRouter.post(
      "/signup-local",
      this.userAuthController.userLocalSignup,
    );
    this.UserRouter.post(
      "/login-local",
      this.userAuthController.userLocalLogin,
    );
    this.UserRouter.post(
      "/test",
      passport.authenticate("jwt", { session: false }),
      (req, res, next) => {},
    );
  }
}
