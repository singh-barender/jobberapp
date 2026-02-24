import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IBuyerDocument } from '@singh-barender/9-jobber-shared';

import { getBuyerByEmail, getBuyerByUsername } from '@users/services/buyer.service';

const email = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByEmail(req.currentUser!.email);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

const currentUsername = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(req.currentUser!.username);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

const username = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(req.params.username as string);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

export { email, username, currentUsername };
