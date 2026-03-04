import { Router } from "express";
import { PaymentController } from "../../controller/payment.controller";
export class PaymentRouter {
    constructor() {
        this.paymentRouter = Router();
        this.paymentController = new PaymentController();
        this.RouteInitializer();
    }
    RouteInitializer() {
        this.paymentRouter.post("/", this.paymentController.newPaymment);
    }
}
