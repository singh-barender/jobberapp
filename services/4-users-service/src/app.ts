import express, { Express } from 'express';

import { start } from '@users/server';
import { config } from '@users/config';
import { databaseConnection } from '@users/database';

const initilize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initilize();
