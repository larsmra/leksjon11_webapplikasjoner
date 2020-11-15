import { userService } from '../services/index.js';
import catchAsyncErrors from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';

export const create = catchAsyncErrors(async (req, res, next) => {
  const user = userService.createUser(req.body);
  if (!user) {
    next(new ErrorHandler());
  }
  res.status(201).json(user);
});
