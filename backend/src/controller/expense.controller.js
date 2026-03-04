import { ExpenseService } from "../service/expense.service";
import { NotFound, Unauthorized } from "../error/httpClientError";
import { GroupService } from "../service/group.service";
import { BalanceService } from "../service/balance.service";
import { EntryService } from "../service/enetry.service";
export class ExpenseController {
    constructor() {
        this.addNewExpenseToGroup = async (req, res, next) => {
            if (req.user) {
                const { title, amount } = req.body;
                const { groupId } = req.params;
                const { id } = req.user;
                const expense = {
                    title,
                    amount,
                };
                if (req.body.description) {
                    expense.description = req.body.description;
                }
                let data = await this.expenseService.addExpense(expense, groupId, id);
                req.resData = {
                    statusCode: 200,
                    data,
                    message: "Success",
                };
                return next();
            }
            throw new Unauthorized();
        };
        this.getAllExpensesOfGroup = async (req, res, next) => {
            if (req.user) {
                const { groupId } = req.params;
                let allGroupExpenses = await this.expenseService.getAllExpense(groupId);
                req.resData = {
                    statusCode: 200,
                    message: "Data Found Successfully",
                    data: allGroupExpenses,
                };
                return next();
            }
            throw new Unauthorized();
        };
        this.getAllUserExpenses = async (req, res, next) => {
            if (req.user) {
                const { groupId } = req.params;
                let data = await this.expenseService.getAllUserExpense(groupId, req.user.id);
                req.resData = {
                    data,
                    statusCode: 200,
                    message: "Data Found Successfully",
                };
                return next();
            }
            throw new Unauthorized();
        };
        this.editExpense = async (req, res, next) => {
            if (req.user) {
                const { expenseId } = req.params;
                const { newExpenseAmount } = req.body;
                // const { groupId } = req.body;
                let expense = await this.expenseService.getExpense(expenseId);
                let groupId;
                if (expense?.groupId) {
                    groupId = expense.groupId.toString();
                    let groupMember = await this.groupService.getMemberCount(groupId);
                    let difference;
                    let updatedExpense;
                    let updatedEntery;
                    let updatedBalance;
                    let updatedGroup;
                    if (expense?.amount) {
                        difference = newExpenseAmount - expense.amount;
                        updatedExpense = await this.expenseService.updateUserExpense(expenseId, difference);
                    }
                    else {
                        throw new NotFound();
                    }
                    if (updatedExpense) {
                        updatedEntery = await this.entryService.updateEntry(expenseId, difference, groupMember[0].memberCount);
                        updatedBalance = await this.balanceService.updateUserBalance(groupId, req.user.id, difference, groupMember[0].memberCount);
                        updatedGroup = await this.groupService.userExpenseEdit(groupId, req.user.id, difference, groupMember[0].memberCount);
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
        this.deleteExpense = async (req, res, next) => {
            if (req.user) {
                const { expenseId } = req.params;
                let expense = await this.expenseService.getExpense(expenseId);
                if (!expense) {
                    throw new NotFound();
                }
                if (expense.groupId) {
                    let groupId = expense.groupId.toString();
                    let groupMember = await this.groupService.getMemberCount(groupId);
                    let expenseAmount;
                    let updatedExpense;
                    let updatedEntery;
                    let updatedBalance;
                    let updatedGroup;
                    if (expense?.amount) {
                        expenseAmount = expense.amount;
                    }
                    else {
                        throw new NotFound();
                    }
                    if (expense) {
                        updatedEntery = await this.entryService.updateEntry(expenseId, -expenseAmount, groupMember[0].memberCount);
                        updatedBalance = await this.balanceService.updateUserBalance(groupId, req.user.id, -expenseAmount, groupMember[0].memberCount);
                        updatedGroup = await this.groupService.userExpenseEdit(groupId, req.user.id, -expenseAmount, groupMember[0].memberCount);
                        updatedExpense = await this.expenseService.deleteExpense(expenseId);
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
        this.expenseService = new ExpenseService();
        this.groupService = new GroupService();
        this.balanceService = new BalanceService();
        this.entryService = new EntryService();
    }
}
