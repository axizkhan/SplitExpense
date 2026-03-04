import { Server } from "./server/server";
import dotenv from "dotenv";
export class BootStrap {
    constructor() {
        this.envLoad();
        /**uncomment in production to not allowed the setup of application if their is no @PORT in .env */
        // this.validatePort();
        this.PORT = this.loadPort();
        this.SERVER = new Server(this.PORT);
    }
    envLoad() {
        dotenv.config();
    }
    validatePort() {
        if (!process.env.PORT) {
            throw new Error("Port is not defined");
        }
    }
    loadPort() {
        return process.env.PORT || 8080;
    }
    async start() {
        await this.SERVER.start();
    }
}
