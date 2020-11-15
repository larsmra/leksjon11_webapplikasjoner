import { pollExecutionService } from '../services/index.js';
import catchAsyncErrors from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';

export const list = catchAsyncErrors(async (req, res, next) => {
  const results = await pollExecutionService.getPollAnswersByPoll(
    req.params.poll
  );
  if (!results) {
    return next(new ErrorHandler('Poll not found', 404));
  }
  res.status(200).json(results);
});

export const create = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const execution = await pollExecutionService.saveChoices(req.body);
  if (!execution) {
    return next(new ErrorHandler('Error', 400));
  }
  res.status(200).json({ success: true, data: execution });
});
