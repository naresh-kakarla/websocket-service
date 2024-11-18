import express from "express";
import WebSocket from "ws";
import { AppDataSource } from "./src/config/database";
import { handleCOnnection } from "./src/controllers/connectionHandler";
import logger from "./src/utils/logger";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const server = app.listen(port, ()=>{
    console.log(`Server is running on localhost:${port}`);
})

// Attaching Webscoket to the http server
const ws = new WebSocket.Server({server});

ws.on("connection", (ws: WebSocket) =>{
    console.log("New WebSocket connection established");
    ws.send("Welcome to the WebSocket Server!");
    handleCOnnection(ws);
});


// Serve a basic HTTP route for testing
app.get('/', (req, res) => {
    logger.info(`Simple http message`);
    res.send('Hello from the Express server!');
  });


// Initialize DataBase

AppDataSource.initialize().then(() =>{
    logger.info(`DataBase Connected`);
}).catch((err) =>{
    logger.error(`Database connection failed ${err}`);
})




