import mongoose from "mongoose";
import { GroupService } from "../service/group.service";
import { InternalServerError } from "../error/httpServerError";
import { BadRequest, NotFound, Unauthorized } from "../error/httpClientError";
import { UserAuthServices } from "../service/userAuth.service";
import { BalanceService } from "../service/balance.service";
export class GroupController {
    constructor() {
        this.createGroup = async (req, res, next) => {
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
        this.addMemberInGroup = async (req, res, next) => {
            if (req.user) {
                const { id } = req.user;
                const { groupId } = req.params;
                const { newMemberEmail } = req.body;
                const group = await this.groupService.isUserExistInGroup(id, groupId);
                if (!group) {
                    throw new NotFound("Either group or user dont exist");
                }
                const newMember = await this.userService.findUserLocalLogin(newMemberEmail);
                if (!newMember) {
                    throw new NotFound("User Dont Exist To Add In Group");
                }
                const isUserAdd = await this.groupService.addUserToGroup(group.toString(), newMember._id.toString());
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
        this.getGroupDetails = async (req, res, next) => {
            try {
                if (!req.user) {
                    throw new Unauthorized();
                }
                const { groupId } = req.params;
                const userId = req.user.id;
                const group = await this.groupService.getGroup(groupId, userId);
                if (!group) {
                    req.resData = {
                        statusCode: 404,
                        message: "Group not found",
                        data: null,
                    };
                    return next();
                }
                const sanitizeData = {
                    userData: {},
                    balances: [],
                    group: {},
                };
                const memberIds = [];
                const memberDetailsMap = {};
                // Extract member data and store member details for later
                for (const member of group.members || []) {
                    const memberId = member.memberId._id.toString();
                    if (memberId === userId) {
                        sanitizeData.userData = {
                            amountOwed: member.amountOwed,
                            amountToBeRecieved: member.amountToBeRecieved,
                        };
                    }
                    else {
                        memberIds.push(memberId);
                        // Store member details for members without balances
                        memberDetailsMap[memberId] = {
                            name: {
                                firstName: member.memberId.name?.firstName || "",
                                lastName: member.memberId.name?.lastName || "",
                            },
                            _id: member.memberId._id,
                            mobileNumber: member.memberId.mobileNumber,
                            upiId: member.memberId.upiId,
                        };
                    }
                }
                // Fetch balances
                let memberBalanceData = [];
                if (memberIds.length) {
                    const balances = await this.balanceService.getAllBalance(memberIds, groupId, userId);
                    memberBalanceData = balances || [];
                }
                // Group summary
                sanitizeData.group = {
                    groupName: group.name,
                    description: group.description,
                    groupId: group._id,
                    totalExpense: group.totalAmount,
                };
                // Track which members have been processed
                const processedMemberIds = new Set();
                // Process balances
                for (const memberBalance of memberBalanceData) {
                    const sanitizedMemberBalance = {
                        _id: memberBalance._id,
                        JournelId: memberBalance.journelId,
                        groupId: memberBalance.groupId,
                    };
                    for (const balance of memberBalance.balances) {
                        const balanceUserId = balance.userId._id.toString();
                        if (balanceUserId === userId) {
                            sanitizedMemberBalance.userAmount = balance.receivedAmount;
                            sanitizedMemberBalance.userId = userId;
                        }
                        else {
                            sanitizedMemberBalance.memberAmount = balance.receivedAmount;
                            processedMemberIds.add(balanceUserId);
                            sanitizedMemberBalance.memberdetails = {
                                name: {
                                    firstName: balance.userId.name?.firstName || "",
                                    lastName: balance.userId.name?.lastName || "",
                                },
                                _id: balance.userId._id,
                                mobileNumber: balance.userId.mobileNumber,
                                upiId: balance.userId.upiId,
                            };
                        }
                    }
                    sanitizeData.balances.push(sanitizedMemberBalance);
                }
                // Add members without balances (members who haven't been involved in expenses)
                for (const memberId of memberIds) {
                    if (!processedMemberIds.has(memberId) && memberDetailsMap[memberId]) {
                        const memberDetail = memberDetailsMap[memberId];
                        const sanitizedMemberBalance = {
                            _id: new mongoose.Types.ObjectId(),
                            JournelId: new mongoose.Types.ObjectId(),
                            groupId: groupId,
                            memberAmount: 0,
                            userAmount: 0,
                            userId: userId,
                            memberdetails: memberDetail,
                        };
                        sanitizeData.balances.push(sanitizedMemberBalance);
                    }
                }
                req.resData = {
                    statusCode: 200,
                    message: "Data found",
                    data: sanitizeData,
                };
                return next();
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        };
        this.groupService = new GroupService();
        this.userService = new UserAuthServices();
        this.balanceService = new BalanceService();
    }
}
