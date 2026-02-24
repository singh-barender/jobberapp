import express, { Router } from 'express';

import { Get } from '@gateway/controllers/users/seller/get';
import { Create } from '@gateway/controllers/users/seller/create';
import { Update } from '@gateway/controllers/users/seller/update';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { SellerSeed } from '@gateway/controllers/users/seller/seed';

class SellerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/seller/id/:sellerId', authMiddleware.checkAuthentication, Get.id);
    this.router.get('/seller/username/:username', authMiddleware.checkAuthentication, Get.username);
    this.router.get('/seller/random/:size', authMiddleware.checkAuthentication, Get.random);
    this.router.post('/seller/create', authMiddleware.checkAuthentication, Create.seller);
    this.router.put('/seller/:sellerId', authMiddleware.checkAuthentication, Update.seller);
    this.router.put('/seller/seed/:count', authMiddleware.checkAuthentication, SellerSeed.seller);

    return this.router;
  }
}

export const sellerRoutes: SellerRoutes = new SellerRoutes();
