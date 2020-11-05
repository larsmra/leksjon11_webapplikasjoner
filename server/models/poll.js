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
    name: {
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
    participants: {
      type: [mongoose.Schema.ObjectId],
      ref: 'User',
      unique: [true, 'You can only answer the poll once'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PollSchema.pre('save', (next) => {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model('Poll', PollSchema);
