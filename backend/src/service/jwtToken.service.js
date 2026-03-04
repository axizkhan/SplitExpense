import jwt from "jsonwebtoken";
// const { sign } = jwt;
export class JWTService {
    constructor() {
        this.singOption = {
            expireIn: "2h",
            issuer: "splitMoney",
            algorithm: "HS256",
            audience: "",
        };
        this.secret = process.env.JWT_SIGN;
    }
    async grantAccessToken(user) {
        try {
            const token = jwt.sign({ id: user.toString() }, this.secret, {
                expiresIn: "2h",
            });
            return token;
        }
        catch (error) {
            throw error;
        }
    }
}
