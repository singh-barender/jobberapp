import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function healthRoutes(): Router {
  const router = Router();

  router.get('/notification-health', (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).send('Notification service is healthy and OK.');
  });

  return router;
}
