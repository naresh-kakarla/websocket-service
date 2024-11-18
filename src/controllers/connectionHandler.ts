import { WebSocket } from "ws";
import { AppDataSource } from "../config/database";
import { Message } from "../entities/message";

import logger from "../utils/logger";

export const handleCOnnection = (ws: WebSocket) => {
    ws.on("message", async (message: string) => {
        logger.info(`Message ==> ${message}`);

        try{
            const newMessage = AppDataSource.getRepository(Message).create({
                message: message
            });

            await AppDataSource.getRepository(Message).save(newMessage);
            ws.send("message saved");
        }catch(error){
            logger.error(`Error Occured : ${error}`);
            ws.send("Error while processing message");
        }
    })

    ws.on("close", ()=>{
        logger.info(`Client disconnected`);
    })

}





