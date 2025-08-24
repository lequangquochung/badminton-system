import mongoose, { Document, Schema } from 'mongoose';
import { EUSERROLE } from '../enum/emodel';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken: String;
  role: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: [EUSERROLE.ADMIN, EUSERROLE.USER],
      default: 'user',
    }
  },
  {
    timestamps: true,
    collection: 'user',
  }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
