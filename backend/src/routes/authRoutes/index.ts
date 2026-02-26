import { Router } from "express";

export class AuthRoutes {
  public AuthRouter: Router;
  constructor() {
    this.AuthRouter = Router();
    this.authPathInitializer();
  }
  authPathInitializer() {
    this.AuthRouter;
  }
}
