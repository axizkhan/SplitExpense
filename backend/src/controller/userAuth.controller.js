import { HashingUtil } from "../utils/hashing.util";
import passport from "passport";
import { UserAuthServices } from "../service/userAuth.service";
import { Unauthorized } from "../error/httpClientError";
import { JWTService } from "../service/jwtToken.service";
export class UserAuthController {
    constructor() {
        this.userLocalSignup = async (req, res, next) => {
            const user = req.body;
            const hashPassword = await this.hashingUtliFunctions.hashPassword(user.password);
            user.password = hashPassword;
            let newUser = await this.userAuthService.userLocalSignup(user);
            try {
                const accessToken = await this.jwt.grantAccessToken(newUser._id);
                const resData = {
                    data: {
                        user: {
                            id: newUser._id,
                            email: newUser.emailId,
                            firstName: newUser.name?.firstName || "",
                            lastName: newUser.name?.lastName || "",
                        },
                        accessToken,
                    },
                    message: "User signup successfully",
                    statusCode: 201,
                };
                req.resData = resData;
                next();
            }
            catch (error) {
                next(error);
            }
        };
        this.userLocalLogin = async (req, res, next) => {
            passport.authenticate("local", { session: false }, async (err, user, info) => {
                try {
                    if (err || !user) {
                        return next(new Unauthorized("Either password or email is incorrect", "PASSWORD_OR_EMAIL_INCORRECT"));
                    }
                    req.login(user, { session: false }, async (loginErr) => {
                        if (loginErr) {
                            return next(new Unauthorized("Either password or email is incorrect", "PASSWORD_OR_EMAIL_INCORRECT"));
                        }
                        try {
                            const accessToken = await this.jwt.grantAccessToken(user._id);
                            const resData = {
                                data: {
                                    user: {
                                        id: user._id,
                                        email: user.emailId,
                                        firstName: user.name?.firstName || "",
                                        lastName: user.name?.lastName || "",
                                    },
                                    accessToken,
                                },
                                message: "User login successfully",
                                statusCode: 200,
                            };
                            req.resData = resData;
                            next();
                        }
                        catch (tokenErr) {
                            next(tokenErr);
                        }
                    });
                }
                catch (error) {
                    next(error);
                }
            })(req, res, next);
        };
        this.userAuthService = new UserAuthServices();
        this.hashingUtliFunctions = new HashingUtil();
        this.jwt = new JWTService();
    }
}
