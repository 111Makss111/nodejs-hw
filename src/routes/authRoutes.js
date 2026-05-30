import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
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
authRoutes.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  ctrlWrapper(requestResetEmail),
);
authRoutes.post('/auth/reset-password', celebrate(resetPasswordSchema), ctrlWrapper(resetPassword));

export default authRoutes;
