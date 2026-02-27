import { Router } from "express";
import { GroupRouter } from "./group.routes";
import { ExpenseRouter } from "./expense.routes";
import { UserRouter } from "./user.routes";

export class AuthRoutes {
  public authRouter: Router;
  private groupRouter: GroupRouter;
  private expenseRouter: ExpenseRouter;
  private userRouter: UserRouter;
  constructor() {
    this.authRouter = Router();
    this.groupRouter = new GroupRouter();
    this.expenseRouter = new ExpenseRouter();
    this.userRouter = new UserRouter();
    this.authPathInitializer();
  }
  authPathInitializer() {
    this.authRouter.use("/group", this.groupRouter.groupRouter);
    this.authRouter.use("/expense", this.expenseRouter.expenseRouter);
    this.authRouter.use("/user", this.userRouter.userRouter);
  }
}
