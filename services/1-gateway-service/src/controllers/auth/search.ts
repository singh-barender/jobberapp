import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { authService } from '@gateway/services/api/auth.service';

export class Search {
  public static async gigById(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.getGig(req.params.gigId as string);
    res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
  }

  public static async gigs(req: Request, res: Response): Promise<void> {
    const { from, size, type } = req.params;
    let query = '';
    console.log('query before', req.query);
    const objList = Object.entries(req.query);
    const lastItemIndex = objList.length - 1;
    objList.forEach(([key, value], index) => {
      query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
    });
    console.log('query after', query);
    const response: AxiosResponse = await authService.getGigs(`${query}`, from as string, size as string, type as string);
    res.status(StatusCodes.OK).json({ message: response.data.message, total: response.data.total, gigs: response.data.gigs });
  }
}
