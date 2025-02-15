import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const getPayPalKey = asyncHandler(
  async (req: Request, res: Response) => {
    res.send({ cliendId: process.env.PAYPAL_CLIENT_ID! });
  }
);
