import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answers: {
    type: [AnswerSchema],
  },
});

const PollSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    slug: String,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PollSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

PollSchema.virtual('pollExecutions', {
  ref: 'PollExecution',
  localField: '_id',
  foreignField: 'poll',
  justOne: false,
});

AnswerSchema.virtual('pollExecutions', {
  ref: 'PollExecution',
  localField: '_id',
  foreignField: 'answers',
  justOne: false,
});

export default mongoose.model('Poll', PollSchema);
