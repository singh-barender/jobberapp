import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const GATEWAY_TOKENS = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
] as const;

const INVALID_REQUEST_MESSAGE = 'Invalid request';
const NOT_FROM_GATEWAY = 'verifyGatewayRequest() method: Request not coming from api gateway';
const INVALID_PAYLOAD = 'verifyGatewayRequest() method: Request payload is invalid';

interface GatewayTokenPayload {
  id: string;
  iat: number;
}

export function verifyGatewayRequest(req: Request, _res: Response, next: NextFunction): void {
  const token = req.headers?.gatewaytoken as string | undefined;

  if (!token) {
    throw new NotAuthorizedError(INVALID_REQUEST_MESSAGE, NOT_FROM_GATEWAY);
  }

  try {
    const payload = JWT.verify(token, '1282722b942e08c8a6cb033aa6ce850e') as GatewayTokenPayload;

    if (!GATEWAY_TOKENS.includes(payload.id as any)) {
      throw new NotAuthorizedError(INVALID_REQUEST_MESSAGE, INVALID_PAYLOAD);
    }
  } catch (error) {
    throw new NotAuthorizedError(INVALID_REQUEST_MESSAGE, NOT_FROM_GATEWAY);
  }
  next();
}
