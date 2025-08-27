import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  message: string;
  rating: number;
  image?: string;
  city?: string;
  createdOn: Date;
  updatedOn: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot be more than 1000 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    image: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      maxlength: [100, 'City cannot be more than 100 characters'],
    },
  },
  {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' },
    toJSON: {
      transform: function (_doc, ret: any) {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for better query performance
TestimonialSchema.index({ name: 'text', message: 'text', city: 'text' });
TestimonialSchema.index({ rating: -1 });
TestimonialSchema.index({ createdOn: -1 });

export const TestimonialModel =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
