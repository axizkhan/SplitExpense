import { Unauthorized } from "../error/httpClientError";
import { JournelServices } from "../service/journel.service";
export class JournelController {
    constructor() {
        this.getJournelEntries = async (req, res, next) => {
            if (req.user) {
                const { journelId } = req.params;
                const { pageNumber } = req.params;
                let journels = await this.journelService.allUserJournel(journelId, Number(pageNumber));
                req.resData = {
                    message: "Data send Successfully",
                    data: journels || "",
                    statusCode: 200,
                };
                return next();
            }
            throw new Unauthorized();
        };
        this.getGroupJournalEntries = async (req, res, next) => {
            if (req.user) {
                const { groupId } = req.params;
                const { pageNumber } = req.params;
                let journels = await this.journelService.allGroupJournalEntries(groupId, Number(pageNumber));
                req.resData = {
                    message: "Data send Successfully",
                    data: journels || "",
                    statusCode: 200,
                };
                return next();
            }
            throw new Unauthorized();
        };
        this.getUserToUserJournalEntries = async (req, res, next) => {
            if (req.user) {
                const { groupId, memberId } = req.params;
                const { pageNumber } = req.params;
                const loggedInUserId = req.user.id;
                let journels = await this.journelService.userToUserJournalEntries(groupId, loggedInUserId, memberId, Number(pageNumber));
                req.resData = {
                    message: "Data send Successfully",
                    data: journels || "",
                    statusCode: 200,
                };
                return next();
            }
            throw new Unauthorized();
        };
        this.journelService = new JournelServices();
    }
}
