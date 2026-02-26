import { Request, Response, NextFunction } from "express";
import { GroupService } from "../service/group.service";
import { InternalServerError } from "../error/httpServerError";
export class GroupController {
  private groupService: GroupService;
  constructor() {
    this.groupService = new GroupService();
  }

  createGroup = async (req: Request, res: Response, next: NextFunction) => {
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
  };

  addMemberInGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {};
}
