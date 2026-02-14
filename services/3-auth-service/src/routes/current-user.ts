import express, { Router } from 'express';

import { token } from '@auth/controllers/refresh-token';
import { read, resendEmail } from '@auth/controllers/current-user';

const router: Router = express.Router();

export function currentUserRoutes(): Router {
  router.get('/currentuser', read);
  router.post('/resend-email', resendEmail);
  router.get('/refresh-token/:username', token);

  return router;
}
