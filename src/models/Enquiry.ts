import mongoose, { Schema, Document, models } from "mongoose";

export interface IEnquiry extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  landType: string;
  plots: string;
  purpose: string;
  budget: string;
  timeline: string;
  paymentPlan: string;
  additionalInfo: string;
  plotRef: string;
  imageUrls: string[];
  completedSteps: number[];
  currentStep: number;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    firstName:      { type: String, required: true, trim: true },
    lastName:       { type: String, required: true, trim: true },
    email:          { type: String, required: true, trim: true, lowercase: true },
    phone:          { type: String, required: true, trim: true },
    country:        { type: String, required: true, trim: true },
    landType:       { type: String, required: true },
    plots:          { type: String, default: "1" },
    purpose:        { type: String, default: "" },
    budget:         { type: String, default: "" },
    timeline:       { type: String, default: "" },
    paymentPlan:    { type: String, default: "" },
    additionalInfo: { type: String, default: "" },
    plotRef:        { type: String, default: "" },
    imageUrls:      { type: [String], default: [] },
    completedSteps: { type: [Number], default: [1] },
    currentStep:    { type: Number, default: 2 },
  },
  { timestamps: true }
);

export const Enquiry = models.Enquiry ?? mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
