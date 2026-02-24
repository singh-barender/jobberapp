import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sellerService } from '@gateway/services/api/seller.service';

export class SellerSeed {
  public static async seller(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.seed(req.params.count as string);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
