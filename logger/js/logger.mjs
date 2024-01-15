import { fileWriter } from "./fileWriter.mjs"

const LOG_FILE_NAME = "log.txt";

export const logger = {
    info(message) {
        fileWriter.appendTo(LOG_FILE_NAME, `${new Date().toISOString()} : ${message}\n`);
    }
}