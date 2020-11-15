import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const PollExecutionSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    requred: true,
  },
  poll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Poll',
    required: true,
  },
  answers: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Answer',
  },
});

PollExecutionSchema.index({ user: 1, poll: 1 }, { unique: true });

export default mongoose.model('PollExecution', PollExecutionSchema);
