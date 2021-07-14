import * as http from "http";
import * as express from "express";
import loader from "./loader";
import { serverConfig } from "./config";

function startServer() {
  const app: express.Application = express();
  loader(app);  
  
  const server: http.Server = http.createServer(app);

  server.listen(serverConfig.PORT, () => {
    console.log(`server is listening on ${serverConfig.PORT}`);
  });
}

startServer();