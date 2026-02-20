import express, { Router } from 'express';

import { Search } from '@gateway/controllers/auth/search';

class SearchRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/search/gig/:from/:size/:type', Search.gigs);
    this.router.get('/auth/search/gig/:gigId', Search.gigById);
    return this.router;
  }
}

export const searchRoutes: SearchRoutes = new SearchRoutes();
