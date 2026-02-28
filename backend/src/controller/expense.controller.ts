import { Request, Response, NextFunction } from "express";
import { ExpenseService } from "../service/expense.service";
import { Unauthorized } from "../error/httpClientError";

export class ExpenseController {
  private expenseService: ExpenseService;
  constructor() {
    this.expenseService = new ExpenseService();
  }

  addNewExpenseToGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.user) {
      const { title, amount } = req.body;
      const { groupId } = req.params;
      const { id } = req.user;

      const expense: { title: string; amount: number; description?: string } = {
        title,
        amount,
      };

      if (req.body.description) {
        expense.description = req.body.description;
      }

      let data = await this.expenseService.addExpense(
        expense,
        groupId as string,
        id,
      );

      req.resData = {
        statusCode: 200,
        data,
        message: "Success",
      };
      return next();
    }

    throw new Unauthorized();
  };

  getAllExpensesOfGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.user) {
      const { groupId } = req.params;
    }
    throw new Unauthorized();
  };
}
