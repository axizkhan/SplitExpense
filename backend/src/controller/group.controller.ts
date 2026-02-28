import { Request, Response, NextFunction } from "express";
import { GroupService } from "../service/group.service";
import { InternalServerError } from "../error/httpServerError";
import { BadRequest, NotFound, Unauthorized } from "../error/httpClientError";
import { UserAuthServices } from "../service/userAuth.service";
import { group } from "node:console";
import { Group } from "../models/groupModel";
import { BalanceService } from "../service/balance.service";
import {
  BalanceResponse,
  GroupSummaryResponse,
} from "../types/groupDetail.types";
export class GroupController {
  private groupService: GroupService;
  private userService: UserAuthServices;
  private balanceService: BalanceService;
  constructor() {
    this.groupService = new GroupService();
    this.userService = new UserAuthServices();
    this.balanceService = new BalanceService();
  }

  createGroup = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const { id } = req.user;
      const { name, description } = req.body;

      const group = await this.groupService.createGroup(id, name, description);
      if (!group) {
        throw new InternalServerError();
      }
      const resObj = {
        data: group,
        statusCode: 201,
        message: "GROUP_CREATED_SUCCESSFULLY",
      };

      req.resData = resObj;
      next();
    }
    throw new Unauthorized();
  };

  addMemberInGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.user) {
      const { id } = req.user;
      const { groupId } = req.params;
      const { newMemberEmail } = req.body;

      const group = await this.groupService.isUserExistInGroup(
        id,
        groupId as string,
      );

      if (!group) {
        throw new NotFound("Either group or user dont exist");
      }
      const newMember =
        await this.userService.findUserLocalLogin(newMemberEmail);

      if (!newMember) {
        throw new NotFound("User Dont Exist To Add In Group");
      }

      const isUserAdd = await this.groupService.addUserToGroup(
        group.toString(),
        newMember._id.toString(),
      );
      if (isUserAdd) {
        const resObject = {
          data: "",
          statusCode: 201,
          message: "User SuccesFully add to group",
        };
        req.resData = resObject;
        return next();
      }
      throw new BadRequest();
    }
    throw new Unauthorized();
  };
  getGroupDetails = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      try {
        const { groupId } = req.params;
        let group = await this.groupService.getGroup(
          groupId as string,
          req.user.id,
        );

        let sanitizeData: GroupSummaryResponse = {
          userData: "",
          balances: [],
          group: "",
        };

        let membersIdArray: Array<string> = [];
        if (group?.members && req.user.id !== undefined) {
          for (let member of group.members) {
            let memberIdString = member.memberId._id.toString();
            if (req.user?.id !== memberIdString) {
              membersIdArray.push(memberIdString);
            } else {
              sanitizeData.userData = {
                amountOwed: member.amountOwed,
                amountToBeRecieved: member.amountToBeRecieved,
              };
            }
          }
        }

        let memberBalanceData: any = null;
        if (membersIdArray.length) {
          memberBalanceData = await this.balanceService.getAllBalance(
            membersIdArray,
            groupId as string,
            req.user.id,
          );
        }

        sanitizeData.group = {
          groupName: group?.name,
          description: group?.description,
          groupId: group?._id,
          totalExpense: group?.totalAmount,
        };

        for (let memberbalance of memberBalanceData) {
          // @ts-ignore
          let sanitizedMemberBalance: BalanceResponse = {
            _id: memberbalance._id,
            JournelId: memberbalance.journelId,
            groupId: memberbalance.groupId,
          };
          for (let i = 0; i < memberbalance.balances.length; i++) {
            let balance = memberbalance.balances[i];

            if (balance.userId._id.toString() === req.user?.id) {
              sanitizedMemberBalance.userAmount = balance.receivedAmount;
              sanitizedMemberBalance.userId = req.user?.id;
            } else {
              sanitizedMemberBalance.memberAmount = balance.receivedAmount;
              sanitizedMemberBalance.memberdetails = {
                name: {
                  firstName: balance.userId.name.firstName,
                  lastName: balance.userId.name.lastName,
                },
                _id: balance.userId._id,
                mobileNumber: balance.userId.mobileNumber,
                upiId: balance.userId.upiId,
              };
            }
          }
          sanitizeData.balances.push(sanitizedMemberBalance);
        }

        req.resData = {
          statusCode: 200,
          message: "Data found",
          data: sanitizeData,
        };

        return next();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

    throw new Unauthorized();
  };
}
