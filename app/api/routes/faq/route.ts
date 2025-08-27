
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { TestimonialModel } from "../../models/testimonials"; // You must have a testimonials model file

// Connect to MongoDB if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: process.env.MONGODB_DB || undefined,
  });
}

// GET /api/routes/faq - Get all testimonials
export async function GET() {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdOn: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/routes/faq - Create a new testimonial
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message, rating, image, city } = body;

    if (!name || !message || typeof rating !== "number") {
      return NextResponse.json(
        { error: "Name, message, and rating are required" },
        { status: 400 }
      );
    }

    const testimonial = await TestimonialModel.create({
      name,
      message,
      rating,
      image,
      city,
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
