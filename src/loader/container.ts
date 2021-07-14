import "reflect-metadata";
import { Container } from "inversify";
import { Bucket, Storage } from "@google-cloud/storage";
import { gcpConfig } from "../config";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Singleton",
});

const storage = new Storage({
  projectId: gcpConfig.projectId,
  keyFilename: gcpConfig.gcpKeyFilename,
});

const recordBucket = storage.bucket(gcpConfig.recordBucket);

container.bind<Bucket>("RecordBucket").toConstantValue(recordBucket);

export default container;