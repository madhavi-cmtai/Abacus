
import mongoose, { Schema, Document } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category?: string;
  createdOn: Date;
  updatedOn: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      maxlength: [500, "Question cannot be more than 500 characters"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      maxlength: [100, "Category cannot be more than 100 characters"],
    },
  },
  {
    // Automatically add createdOn & updatedOn
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },

    toJSON: {
      transform: function (_doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for performance
FAQSchema.index({ question: "text", answer: "text", category: "text" });
FAQSchema.index({ createdOn: -1 });

export const FAQModel =
  mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);
