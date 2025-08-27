import { NextRequest, NextResponse } from 'next/server';
import { TestimonialModel } from '@/app/api/models/testimonials';

// GET /api/routes/testimonials/[id] - Get testimonial by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const testimonial = await TestimonialModel.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

// PUT /api/routes/testimonials/[id] - Update testimonial by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, message, rating, image, city } = body;

    // Validate required fields
    if (!name || !message || typeof rating !== 'number') {
      return NextResponse.json(
        { error: 'Name, message, and rating are required.' },
        { status: 400 }
      );
    }

    const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
      id,
      {
        name,
        message,
        rating,
        image,
        city,
        updatedOn: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE /api/routes/testimonials/[id] - Delete testimonial by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deletedTestimonial = await TestimonialModel.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Testimonial deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
