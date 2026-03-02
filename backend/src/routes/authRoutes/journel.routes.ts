import { Router } from "express";

import { JournelController } from "../../controller/journel.controller";

export class JournelRouter {
  public journelRouter: Router;
  private journelController: JournelController;
  constructor() {
    this.journelRouter = Router();
    this.journelController = new JournelController();
    this.RouteInitializer();
  }

  private RouteInitializer() {
    this.journelRouter.get(
      "/:journelId/:pageNumber",
      this.journelController.getJournelEntries,
    );
  }
}
