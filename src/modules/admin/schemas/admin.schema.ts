import { Schema } from 'mongoose';
import { PermissionEnum, RoleEnum } from 'src/constants/enum';
import { Admin } from '../entities/admin.entity';

export type AdminDocument = Admin & Document;

export const AdminSchema = new Schema<Admin>(
  {
    email: {
      type: String,
      unique: true,
    },
    displayName: {
      type: String,
    },
    password: {
      type: String,
      trim: true,
    },
    permissions: {
      type: String,
      enum: Object.values(PermissionEnum),
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
    },
    phoneNumber: {
      type: String,
      trim: true,
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
