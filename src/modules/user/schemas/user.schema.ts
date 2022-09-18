import { Document, Schema, Types } from 'mongoose';
import { PermissionEnum, RoleEnum } from 'src/constants/enum';
import { User } from '../entities/user.entity';

export type UserDocument = User & Document;

export const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
    },
    displayName: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
    },
    permissions: {
      type: String,
      enum: Object.values(PermissionEnum),
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
