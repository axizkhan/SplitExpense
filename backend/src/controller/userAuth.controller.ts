import { Request, Response, NextFunction } from "express";
import { HashingUtil } from "../utils/hashing.util";
import passport from "passport";

import { UserAuthServices } from "../service/userAuth.service";
import { Conflict, NotFound, Unauthorized } from "../error/httpClientError";
import { ObjectId } from "mongoose";
import { JWTService } from "../service/jwtToken.service";
export class UserAuthController {
  private userAuthService: UserAuthServices;
  private hashingUtliFunctions: HashingUtil;
  private jwt: JWTService;

  constructor() {
    this.userAuthService = new UserAuthServices();
    this.hashingUtliFunctions = new HashingUtil();
    this.jwt = new JWTService();
  }

  userLocalSignup = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const hashPassword = await this.hashingUtliFunctions.hashPassword(
      user.password,
    );

    user.password = hashPassword;

    let data = await this.userAuthService.userLocalSignup(user);

    const resData = {
      data,
      message: "User signup successfully",
      statusCode: 201,
    };

    req.resData = resData;

    next();
  };

  userLocalLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      { session: false },
      async (err: Error, user: any, info: any) => {
        try {
          if (err || !user) {
            return next(
              new Unauthorized(
                "Either password or email is incorrect",
                "PASSWORD_OR_EMAIL_INCORRECT",
              ),
            );
          }

          req.login(user, { session: false }, (loginErr) => {
            if (loginErr) {
              return next(
                new Unauthorized(
                  "Either password or email is incorrect",
                  "PASSWORD_OR_EMAIL_INCORRECT",
                ),
              );
            }

            this.jwt
              .grantAccessToken(user)
              .then((token) => {
                res.send(token);
              })
              .catch((tokenErr) => {
                next(tokenErr);
              });
          });
        } catch (error) {
          next(error);
        }
      },
    )(req, res, next);
  };
}
