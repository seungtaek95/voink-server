import http, { Server } from "http";
import serverConfig from "./config/server";

function startServer() {
  const server: Server = http.createServer();

  server.listen(serverConfig.PORT, () => {
    console.log(`server is listening on ${serverConfig.PORT}`);
  });
}

startServer();