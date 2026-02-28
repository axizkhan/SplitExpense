import { NextFunction, Request, Response } from "express";
import { GroupService } from "../service/group.service";
import { userInfo } from "node:os";
import { Unauthorized } from "../error/httpClientError";

export class UserController {
  private groupService: GroupService;
  constructor() {
    this.groupService = new GroupService();
  }

  getAllGroup = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      let result = await this.groupService.getAllGroup(req.user.id);

      let finalData = result.map((group) => {
        let senitizedGroup = {
          name: group.name,
          totalMember: group.members.length,
          createdAt: new Date(group._id.getTimestamp()),
          description: "",
        };
        if (group.description) {
          senitizedGroup.description = group.description;
        }

        return senitizedGroup;
      });

      req.resData = {
        data: finalData,
        statusCode: 200,
        message: "Data found sucessfully",
      };

      return next();
    }
    throw new Unauthorized();
  };
}
