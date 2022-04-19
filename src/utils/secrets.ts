import fs from "fs";
import dotenv from "dotenv";

import logger from "./logger";

if (!fs.existsSync(".env")) {
    logger.error("Unable to find .env file");
    process.exit(1);
}

dotenv.config({ path: ".env" });

const prod = process.env.NODE_ENV === "production";

export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

if (!MONGODB_URI) {    
    if (prod) {
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}
