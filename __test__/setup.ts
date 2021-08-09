import { Application } from 'express';
import loader from '../src/loader';

export async function setup(app: Application) {
  await loader(app);
}