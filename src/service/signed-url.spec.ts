import "reflect-metadata";
import { Bucket } from "@google-cloud/storage";
import container from "../loader/container";
import { SignedUrlService } from "./signed-url.service";

describe("SignedUrlService", () => {
  const recordBucket = container.get<Bucket>("RecordBucket");
  const signedUrlService = new SignedUrlService(recordBucket);

  test("레코드 리스트 조회", async () => {
    expect(async () => {
      await signedUrlService.getFiles();
    }).not.toThrow();
  });
});