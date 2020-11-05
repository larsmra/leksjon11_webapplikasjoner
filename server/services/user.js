import User from '../models/user';

export const createUser = async (data) => User.create(data);
