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
      let allGroupExpenses = await this.expenseService.getAllExpense(
        groupId as string,
      );

      req.resData = {
        statusCode: 200,
        message: "Data Found Successfully",
        data: allGroupExpenses,
      };

      return next();
    }
    throw new Unauthorized();
  };
  getAllUserExpenses = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.user) {
      const { groupId } = req.params;
      let data = await this.expenseService.getAllUserExpense(
        groupId as string,
        req.user.id,
      );

      req.resData = {
        data,
        statusCode: 200,
        message: "Data Found Successfully",
      };

      return next();
    }
    throw new Unauthorized();
  };
}
