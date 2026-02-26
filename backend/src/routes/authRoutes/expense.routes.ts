import { Router } from "express";

import { GroupController } from "../../controller/group.controller";

export class ExpenseRouter {
  public groupRouter: Router;
  //   private ExpenseController: GroupController;
  constructor() {
    this.groupRouter = Router();
    // this.groupController = new GroupController();
    this.RouteInitializer();
  }

  private RouteInitializer() {}
}
