import { Application } from 'express';
import { verifyGatewayRequest } from '@singh-barender/9-jobber-shared';

import { authRoutes } from '@auth/routes/auth';
import { seedRoutes } from '@auth/routes/seed';
import { healthRoutes } from '@auth/routes/health';
import { searchRoutes } from '@auth/routes/search';
import { currentUserRoutes } from '@auth/routes/current-user';

const BASE_PATH = '/api/v1/auth';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());
  app.use(BASE_PATH, searchRoutes());
  app.use(BASE_PATH, seedRoutes());

  app.use(BASE_PATH, verifyGatewayRequest, authRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, currentUserRoutes());
}
