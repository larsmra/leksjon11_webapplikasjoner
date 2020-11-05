import mongoose from 'mongoose';
import validator from 'validator';
import argon2 from 'argon2';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Fill out email'],
      unique: true,
      validate: [validator.isEmail, 'Incorrect email'],
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

UserSchema.pre('save', async (next) => {
  this.password = await argon2.hash(this.password);
  next();
});

UserSchema.virtual('polls', {
  ref: 'Poll',
  localField: '_id',
  foreignField: 'author',
  justOne: false,
});

export default mongoose.model('User', UserSchema);
