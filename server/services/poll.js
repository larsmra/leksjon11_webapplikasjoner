import Poll from '../models/poll';

export const getPollById = async (id) => Poll.findById(id);

export const createPoll = async (data) => Poll.create(data);

export const updatePoll = async (id, data) => {
  Poll.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};
