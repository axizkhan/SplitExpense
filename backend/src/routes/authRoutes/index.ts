import { Router } from "express";
import { GroupRouter } from "./group.routes";

export class AuthRoutes {
  public authRouter: Router;
  private groupRouter: GroupRouter;
  constructor() {
    this.authRouter = Router();
    this.groupRouter = new GroupRouter();
    this.authPathInitializer();
  }
  authPathInitializer() {
    this.authRouter.use("/group", this.groupRouter.groupRouter);
  }
}
