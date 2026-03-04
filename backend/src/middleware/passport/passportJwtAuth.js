import passport from "passport";
import PassportJWT, { ExtractJwt } from "passport-jwt";
export class PassportJWTMIddleware {
    constructor() {
        this.jwt = process.env.JWT_SIGN;
    }
    passportJwtFactory() {
        return passport.use(new PassportJWT.Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.jwt,
        }, async (payload, done) => {
            if (!payload) {
                return done(null, false);
            }
            return done(null, payload);
        }));
    }
}
