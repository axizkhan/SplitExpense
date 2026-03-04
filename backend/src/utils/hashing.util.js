import * as bcrypt from "bcrypt";
export class HashingUtil {
    constructor() {
        this.saltRound = Number(process.env.SALT_ROUND);
    }
    async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRound);
            return hashedPassword;
        }
        catch (error) {
            throw error;
        }
    }
    async hashPasswordComparison(password, hashPassword) {
        try {
            const isMatch = await bcrypt.compare(password, hashPassword);
            return isMatch;
        }
        catch (error) {
            throw error;
        }
    }
}
