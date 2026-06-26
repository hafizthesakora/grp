import mongoose, { Schema, Document, models } from "mongoose";

export interface IEventRegistration extends Document {
  eventSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  investorType: "diaspora" | "local";
  landInterest: string;
  heardFrom: string;
  createdAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    eventSlug:    { type: String, required: true, default: "beyond-accra-2026" },
    firstName:    { type: String, required: true, trim: true },
    lastName:     { type: String, required: true, trim: true },
    email:        { type: String, required: true, trim: true, lowercase: true },
    phone:        { type: String, default: "", trim: true },
    country:      { type: String, required: true, trim: true },
    investorType: { type: String, enum: ["diaspora", "local"], required: true },
    landInterest: { type: String, default: "" },
    heardFrom:    { type: String, default: "" },
  },
  { timestamps: true }
);

export const EventRegistration =
  models.EventRegistration ??
  mongoose.model<IEventRegistration>("EventRegistration", EventRegistrationSchema);
