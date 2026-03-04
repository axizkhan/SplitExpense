import passport from "passport";
import * as LocalStrategy from "passport-local";
import { UserAuthServices } from "../../service/userAuth.service";
import { HashingUtil } from "../../utils/hashing.util";
export class PassportStrategy {
    constructor() {
        this.userService = new UserAuthServices();
        this.hashUtil = new HashingUtil();
    }
    localStrtegyFactory() {
        return passport.use(new LocalStrategy.Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
            try {
                const user = await this.userService.findUserLocalLogin(email);
                if (!user) {
                    return done(null, false, {
                        message: "Password or Email is Incorrect",
                    });
                }
                console.log(user, "USER");
                const isPasswordMatched = await this.hashUtil.hashPasswordComparison(password, user.account.passwordHash);
                if (!isPasswordMatched) {
                    return done(null, false, {
                        message: "Password or Email is Incorrect",
                    });
                }
                return done(null, user, { message: "LoggedIn" });
            }
            catch (error) {
                throw error;
            }
        }));
    }
}
