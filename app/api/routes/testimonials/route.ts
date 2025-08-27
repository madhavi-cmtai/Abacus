import { NextRequest, NextResponse } from 'next/server';
import { TestimonialModel } from '@/app/api/models/testimonials';

// GET /api/routes/testimonials - Get all testimonials
export async function GET(req: NextRequest) {
  try {
    // Optionally, you can add query params for filtering, sorting, etc.
    const testimonials = await TestimonialModel.find().sort({ createdOn: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST /api/routes/testimonials - Create a new testimonial
export async function POST(req: NextRequest) {
  try {
    // If using multipart/form-data, you may need to use a parser like 'formidable'
    // For now, assume JSON body
    const body = await req.json();

    // Validate required fields
    const { name, message, rating, image, city } = body;
    if (!name || !message || typeof rating !== 'number') {
      return NextResponse.json(
        { error: 'Name, message, and rating are required.' },
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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
