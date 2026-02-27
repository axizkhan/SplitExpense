import { Request, Response, NextFunction } from "express";
import { GroupService } from "../service/group.service";
import { InternalServerError } from "../error/httpServerError";
import { BadRequest, NotFound, Unauthorized } from "../error/httpClientError";
import { UserAuthServices } from "../service/userAuth.service";
import { group } from "node:console";
import { Group } from "../models/groupModel";
export class GroupController {
  private groupService: GroupService;
  private userService: UserAuthServices;
  constructor() {
    this.groupService = new GroupService();
    this.userService = new UserAuthServices();
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

        console.log(group);
        return res.send("successfull");
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

    throw new Unauthorized();
  };
}
