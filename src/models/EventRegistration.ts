import mongoose, { Schema, Document, models } from "mongoose";

// One collection serves every event. Fields specific to a single event type are
// optional at the schema level and validated per-event in the API route:
//   beyond-accra-2026  → country + investorType (webinar / investor profiling)
//   roots-festival-2026 → comingFrom + attendingAs + guests (in-person headcount)
export interface IEventRegistration extends Document {
  eventSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  investorType: "diaspora" | "local" | "";
  landInterest: string;
  comingFrom: string;
  attendingAs: "guest" | "vendor" | "exhibitor" | "";
  guests: number;
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
    country:      { type: String, default: "", trim: true },
    investorType: { type: String, enum: ["diaspora", "local", ""], default: "" },
    landInterest: { type: String, default: "" },
    comingFrom:   { type: String, default: "", trim: true },
    attendingAs:  { type: String, enum: ["guest", "vendor", "exhibitor", ""], default: "" },
    guests:       { type: Number, default: 1, min: 1, max: 50 },
    heardFrom:    { type: String, default: "" },
  },
  { timestamps: true }
);

export const EventRegistration =
  models.EventRegistration ??
  mongoose.model<IEventRegistration>("EventRegistration", EventRegistrationSchema);
