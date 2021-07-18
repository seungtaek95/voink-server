import * as http from 'http';
import * as express from 'express';
import loader from './loader';
import { serverConfig } from './config';

async function startServer() {
  const app: express.Application = express();
  await loader(app);  
  
  const server: http.Server = http.createServer(app);

  server.listen(serverConfig.port, () => {
    console.log(`server is listening on ${serverConfig.port}`);
  });
}

startServer();