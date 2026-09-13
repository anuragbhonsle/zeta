import mongoose, { Schema } from "mongoose";

interface NewsletterT {
  email: string;
  createdAt: Date;
}

const newsletterSchema = new Schema<NewsletterT>(
  {
    email: { type: String, required: true },
  },
  { timestamps: true },
);

const Newsletter =
  mongoose.models.Newsletter ||
  mongoose.model<NewsletterT>("Newsletter", newsletterSchema);

export default Newsletter;
