import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');

import {
  userController,
  authenticationController,
  sessionController,
  authenticationMiddleware,
  productController,
} from '../dependencies/dependencyInjection';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.post('/users', userController.post);
router.post('/sessions', sessionController.post);

router.use(authenticationMiddleware.validate);
router.post('/auth', authenticationController.post);

router.get('/users/:userId', userController.getById);
router.put('/users/:userId/balance', userController.updateBalance);
router.post('/products', productController.post);
router.get('/products', productController.get);
router.get('/products/:productId', productController.getById);
router.put('/products/:productId', productController.put);

export default router;
