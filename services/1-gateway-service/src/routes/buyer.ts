import express, { Router } from 'express';

import { Get } from '@gateway/controllers/users/buyer/get';
import { authMiddleware } from '@gateway/services/auth-middleware';

class BuyerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/buyer/email', authMiddleware.checkAuthentication, Get.email);
    this.router.get('/buyer/username', authMiddleware.checkAuthentication, Get.currentUsername);
    this.router.get('/buyer/:username', authMiddleware.checkAuthentication, Get.username);
    return this.router;
  }
}

export const buyerRoutes: BuyerRoutes = new BuyerRoutes();
