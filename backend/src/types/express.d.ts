import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      resData: {
        statusCode: number;
        data?: any;
        message: string;
      };
    }
  }
}
