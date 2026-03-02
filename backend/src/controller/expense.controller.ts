import { Request, Response, NextFunction } from "express";
import { ExpenseService } from "../service/expense.service";
import { NotFound, Unauthorized } from "../error/httpClientError";
import { GroupService } from "../service/group.service";
import { BalanceService } from "../service/balance.service";
import { EntryService } from "../service/enetry.service";

export class ExpenseController {
  private expenseService: ExpenseService;
  private groupService: GroupService;
  private balanceService: BalanceService;
  private entryService: EntryService;
  constructor() {
    this.expenseService = new ExpenseService();
    this.groupService = new GroupService();
    this.balanceService = new BalanceService();
    this.entryService = new EntryService();
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

  editExpense = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const { expenseId } = req.params;
      const { newExpenseAmount } = req.body;
      // const { groupId } = req.body;
      let expense = await this.expenseService.getExpense(expenseId as string);
      let groupId;
      if (expense?.groupId) {
        groupId = expense.groupId.toString();
        let groupMember = await this.groupService.getMemberCount(groupId);
        let difference: number;
        let updatedExpense: any;
        let updatedEntery: any;
        let updatedBalance: any;
        let updatedGroup: any;
        if (expense?.amount) {
          difference = newExpenseAmount - expense.amount;
          updatedExpense = await this.expenseService.updateUserExpense(
            expenseId as string,
            difference,
          );
        } else {
          throw new NotFound();
        }

        if (updatedExpense) {
          updatedEntery = await this.entryService.updateEntry(
            expenseId as string,
            difference,
            groupMember[0].memberCount,
          );
          updatedBalance = await this.balanceService.updateUserBalance(
            groupId as string,
            req.user.id,
            difference,
            groupMember[0].memberCount,
          );
          updatedGroup = await this.groupService.userExpenseEdit(
            groupId as string,
            req.user.id,
            difference,
            groupMember[0].memberCount,
          );

          req.resData = {
            statusCode: 200,
            message: "Expense Updated Successfully",
            data: "",
          };

          return next();
        }
        throw new NotFound();
      }
      throw new Error();
    }
    throw new Unauthorized();
  };

  deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const { expenseId } = req.params;

      let expense = await this.expenseService.getExpense(expenseId as string);

      if (!expense) {
        throw new NotFound();
      }
      if (expense.groupId) {
        let groupId = expense.groupId.toString();
        let groupMember = await this.groupService.getMemberCount(groupId);
        let expenseAmount: number;
        let updatedExpense: any;
        let updatedEntery: any;
        let updatedBalance: any;
        let updatedGroup: any;
        if (expense?.amount) {
          expenseAmount = expense.amount;
        } else {
          throw new NotFound();
        }

        if (expense) {
          updatedEntery = await this.entryService.updateEntry(
            expenseId as string,
            expenseAmount,
            groupMember[0].memberCount,
          );
          updatedBalance = await this.balanceService.updateUserBalance(
            groupId as string,
            req.user.id,
            expenseAmount,
            groupMember[0].memberCount,
          );
          updatedGroup = await this.groupService.userExpenseEdit(
            groupId as string,
            req.user.id,
            expenseAmount,
            groupMember[0].memberCount,
          );

          updatedExpense = await this.expenseService.deleteExpense(
            expenseId as string,
          );

          req.resData = {
            statusCode: 200,
            message: "Expense Deleted Successfully",
            data: "",
          };

          return next();
        }
      }
    }
    throw new Unauthorized();
  };
}
