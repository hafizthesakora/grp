import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: "admin" | "client";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email:        { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name:         { type: String, required: true, trim: true },
    role:         { type: String, enum: ["admin", "client"], default: "client" },
  },
  { timestamps: true }
);

export const User = models.User ?? mongoose.model<IUser>("User", UserSchema);
