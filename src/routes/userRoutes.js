import { Router } from 'express';

import { updateUserAvatar } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const userRoutes = Router();

const ctrlWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

userRoutes.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateUserAvatar),
);

export default userRoutes;
