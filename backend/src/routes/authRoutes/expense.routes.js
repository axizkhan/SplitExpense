import { Router } from "express";
import { ExpenseController } from "../../controller/expense.controller";
export class ExpenseRouter {
    constructor() {
        this.expenseRouter = Router();
        this.expenseController = new ExpenseController();
        this.RouteInitializer();
    }
    RouteInitializer() {
        this.expenseRouter.post("/:groupId", this.expenseController.addNewExpenseToGroup);
        this.expenseRouter.get("/user/:groupId", this.expenseController.getAllUserExpenses);
        this.expenseRouter.get("/:groupId", this.expenseController.getAllExpensesOfGroup);
        this.expenseRouter.put("/:expenseId", this.expenseController.editExpense);
        this.expenseRouter.delete("/:expenseId", this.expenseController.deleteExpense);
    }
}
