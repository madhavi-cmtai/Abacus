import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  image?: string;
  price?: number;
  category?: string;
  createdOn: Date;
  updatedOn: Date;
  status: 'active' | 'inactive';
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'Category cannot be more than 50 characters'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    // Automatically manage createdOn & updatedOn
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
ServiceSchema.index({ title: 'text', description: 'text' }); // Full-text search
ServiceSchema.index({ status: 1, category: 1 }); // Compound index for filtering
ServiceSchema.index({ createdOn: -1 }); // For sorting by newest

export const ServiceModel =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
