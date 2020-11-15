import Poll from '../models/poll.js';

export const getPollById = async (id) => Poll.findById(id);

export const createPoll = async (data) => Poll.create(data);
