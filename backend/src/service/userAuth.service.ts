import { Conflict } from "../error/httpClientError";
import { UserModel } from "../models/userModel";
import { User } from "../types/user";
import { IUser } from "../types/userModel";

export class UserAuthServices {
  async userLocalSignup(user: User) {
    let userDocument: IUser = {
      emailId: user.email,
      name: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      account: {
        type: "local",
        passwordHash: user.password,
      },
    };

    if (user.mobileNumber) {
      userDocument.mobileNumber = user.mobileNumber;
    }
    if (user.upiId) {
      userDocument.upiId = user.upiId;
    }

    try {
      await UserModel.insertOne(userDocument);
      return "User Login Successfully";
    } catch (err) {
      throw new Conflict("Email Already Exist", "USER_EXIST");
    }
  }

  async findUserLocalLogin(email: string) {
    const user = await UserModel.findOne({ emailId: email });
    return user;
  }
}
