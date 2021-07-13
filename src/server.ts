import http, { Server } from "http";
import express, { Application } from "express";
import loader from "./loader";
import serverConfig from "./config/server";

function startServer() {
  const app: Application = express();
  loader(app);  
  
  const server: Server = http.createServer(app);

  server.listen(serverConfig.PORT, () => {
    console.log(`server is listening on ${serverConfig.PORT}`);
  });
}

startServer();