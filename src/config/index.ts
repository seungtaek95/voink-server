import * as dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
  port: parseInt(process.env.SERVER_PORT) || 3000,
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'voink',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '365d'
};

export const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'voink',
};

export const gcpConfig = {
  projectId: process.env.GCP_PROJECT_ID,
  gcpKeyFilename: process.env.GCP_KEY_FILENAME,
  recordBucket: process.env.GCP_RECORD_BUCKET,
  profileBucket: process.env.GCP_PROFILE_BUCKET,
};
