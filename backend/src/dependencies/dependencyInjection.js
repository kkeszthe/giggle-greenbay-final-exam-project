import { errorCodes, UserRepo, ProductRepo } from '../repos';
import { UserService, SessionService, ProductService } from '../services';
import { AuthenticationMiddleware } from '../middlewares';
import {
  UserController,
  SessionController,
  AuthenticationController,
  ProductController,
} from '../controllers';

import { db } from '../data/connection';

export const userRepo = new UserRepo(db, errorCodes);
export const productRepo = new ProductRepo(db, errorCodes);

export const userService = new UserService({ userRepo, errorCodes });
export const sessionService = new SessionService({ userService, errorCodes });
export const productService = new ProductService({
  productRepo,
  userService,
  errorCodes,
});

export const userController = new UserController({ userService, errorCodes });
export const sessionController = new SessionController({
  sessionService,
  errorCodes,
});
export const productController = new ProductController({
  productService,
  errorCodes,
});
export const authenticationController = new AuthenticationController();

export const authenticationMiddleware = new AuthenticationMiddleware(
  sessionService,
  errorCodes
);
