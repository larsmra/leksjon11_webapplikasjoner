import { pollService } from '../services/index';

export const get = async (req, res, next) => {
  const poll = await pollService.getPollById(req.params.id);
  /*
        Error handling here...
    */
  res.status(200).json(poll);
};

export const create = async (req, res, next) => {
  const poll = await pollService.createPoll(req.body);
  /*
        Error handling here...
    */
  res.status(200).json(poll);
};

export const update = async (req, res, next) => {
  let poll = await pollService.getPollById(req.params.id);
  /*
        Error handling here...
    */
  poll = await pollService.updatePoll(req.params.id, req.body);
  res.status(200).json(poll);
};
