import { Router } from "express";
import { GroupController } from "../../controller/group.controller";
export class GroupRouter {
    constructor() {
        this.groupRouter = Router();
        this.groupController = new GroupController();
        this.RouteInitializer();
    }
    RouteInitializer() {
        this.groupRouter.post("/", this.groupController.createGroup);
        this.groupRouter.put("/:groupId", this.groupController.addMemberInGroup);
        this.groupRouter.get("/:groupId", this.groupController.getGroupDetails);
    }
}
