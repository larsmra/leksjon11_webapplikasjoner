import { pollService } from '../services/index.js';
import catchAsyncErrors from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';

export const get = catchAsyncErrors(async (req, res, next) => {
  const poll = await pollService.getPollById(req.params.id);
  if (!poll) {
    return next(new ErrorHandler('Poll not found', 404));
  }
  res.status(201).json({ success: true, data: poll });
});

export const create = catchAsyncErrors(async (req, res, next) => {
  req.body.author = req.user.id;
  const poll = await pollService.createPoll(req.body);
  if (!poll) {
    return next(new ErrorHandler('Poll was not created', 400));
  }
  res.status(201).json({ success: true, data: poll });
});
