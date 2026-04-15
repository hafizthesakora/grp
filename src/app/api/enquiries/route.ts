import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, email, phone, country,
      landType, plots, purpose, budget, timeline, paymentPlan, additionalInfo,
      imageUrls,
    } = body;

    if (!firstName || !lastName || !email || !phone || !country || !landType) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const plotRef = "GRP-" + Date.now().toString(36).toUpperCase().slice(-6);

    const safeImageUrls = Array.isArray(imageUrls)
      ? imageUrls.filter((u: unknown) => typeof u === "string" && u.startsWith("/uploads/")).slice(0, 5)
      : [];

    const enquiry = await Enquiry.create({
      firstName, lastName, email: email.toLowerCase().trim(), phone, country,
      landType, plots, purpose, budget, timeline, paymentPlan, additionalInfo,
      plotRef,
      imageUrls: safeImageUrls,
      completedSteps: [1],
      currentStep: 2,
    });

    return Response.json({ success: true, plotRef: enquiry.plotRef, firstName }, { status: 201 });
  } catch (err) {
    console.error("POST /api/enquiries error:", err);
    return Response.json({ error: "Failed to save enquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return Response.json(enquiries);
  } catch (err) {
    console.error("GET /api/enquiries error:", err);
    return Response.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
