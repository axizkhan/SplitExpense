import { Unauthorized } from "../error/httpClientError";
export class IsUserExist {
    isUserExist(req, res, next) {
        if (!req.user) {
            throw new Unauthorized("Login before processed", "LOGIN_BEFORE_PROCESSED");
        }
        next();
    }
}
