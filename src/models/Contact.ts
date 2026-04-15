import mongoose, { Schema, Document, models } from "mongoose";

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  landInterest: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    firstName:    { type: String, required: true, trim: true },
    lastName:     { type: String, required: true, trim: true },
    email:        { type: String, required: true, trim: true, lowercase: true },
    phone:        { type: String, default: "", trim: true },
    landInterest: { type: String, default: "" },
    message:      { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Contact = models.Contact ?? mongoose.model<IContact>("Contact", ContactSchema);
