import * as dotenv from 'dotenv';

dotenv.config();

export const serverConfig = {
  PORT: process.env.PORT || 3000,
};

export const gcpConfig = {
  projectId: process.env.GCP_PROJECT_ID,
  gcpKeyFilename: process.env.GCP_KEY_FILENAME,
  recordBucket: process.env.GCP_RECORD_BUCKET,
};
