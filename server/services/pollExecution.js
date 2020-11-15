import PollExecution from '../models/pollExecution.js';

export const saveChoices = async (data) => PollExecution.create(data);
