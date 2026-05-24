import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const authRoutes = Router();

const ctrlWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

authRoutes.post('/auth/register', celebrate(registerUserSchema), ctrlWrapper(registerUser));
authRoutes.post('/auth/login', celebrate(loginUserSchema), ctrlWrapper(loginUser));
authRoutes.post('/auth/refresh', ctrlWrapper(refreshUserSession));
authRoutes.post('/auth/logout', ctrlWrapper(logoutUser));

export default authRoutes;
