import express, { Router } from 'express';
// import { Signout } from '@gateway/controllers/auth/signout';
// import { VerifyOTP } from '@gateway/controllers/auth/verify-otp';

import { SignUp } from '@gateway/controllers/auth/signup';
import { SignIn } from '@gateway/controllers/auth/signin';
import { AuthSeed } from '@gateway/controllers/auth/seed';
import { Password } from '@gateway/controllers/auth/password';
import { VerifyEmail } from '@gateway/controllers/auth/verify-email';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignUp.create);
    this.router.post('/auth/signin', SignIn.read);
    // this.router.post('/auth/signout', Signout.prototype.update);
    this.router.put('/auth/verify-email', VerifyEmail.update);
    // this.router.put('/auth/verify-otp/:otp', VerifyOTP.prototype.update);
    this.router.put('/auth/forgot-password', Password.forgotPassword);
    this.router.put('/auth/reset-password/:token', Password.resetPassword);
    this.router.put('/auth/change-password', Password.changePassword);
    this.router.put('/auth/seed/:count', AuthSeed.create);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
