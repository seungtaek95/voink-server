import http from 'http';
import serverConfig from './config/server.js'

function startServer() {
  const server = http.createServer();

  server.listen(serverConfig.PORT, () => {
    console.log(`server is listening on ${serverConfig.PORT}`);
  });
}

startServer();