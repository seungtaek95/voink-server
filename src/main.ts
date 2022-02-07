import * as http from 'http';
import * as express from 'express';
import loader from './common/loader';
import { serverConfig } from './common/config';

async function startServer() {
  const app = express();
  await loader(app);  
  
  const server = http.createServer(app);

  server.listen(serverConfig.port, () => {
    console.log(`server is listening on ${serverConfig.port}`);
  });
}

startServer();