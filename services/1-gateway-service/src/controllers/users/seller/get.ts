import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sellerService } from '@gateway/services/api/seller.service';

export class Get {
  public static async id(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.getSellerById(req.params.sellerId as string);
    res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
  }

  public static async username(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.getSellerByUsername(req.params.username as string);
    res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
  }

  public static async random(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.getRandomSellers(req.params.size as string);
    res.status(StatusCodes.OK).json({ message: response.data.message, sellers: response.data.sellers });
  }
}
