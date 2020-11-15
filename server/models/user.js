import mongoose from 'mongoose';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Fill out email'],
      unique: true,
      validate: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Fill out password'],
      minlength: [8, 'The password must be minimum 8 characters long'],
      select: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.pre('save', async function (next) {
  this.password = await argon2.hash(this.password);
  next();
});

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return argon2.verify(this.password, password);
};

UserSchema.virtual('polls', {
  ref: 'Poll',
  localField: '_id',
  foreignField: 'author',
  justOne: false,
});

UserSchema.virtual('pollExecutions', {
  ref: 'PollExecution',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

export default mongoose.model('User', UserSchema);
