import { userService } from '../services/index';

export const create = async (req, res, next) => {
  const user = userService.createUser(req.body);
  res.status(201).json(user);
};
