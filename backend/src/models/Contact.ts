import mongoose, { Schema } from "mongoose";

interface ContactT {
  email: string;
  phone: string;
  name: string;
  message: string;
  createdAt: Date;
}

const contactSchema = new Schema<ContactT>(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const Contact =
  mongoose.models.Contact || mongoose.model<ContactT>("Contact", contactSchema);

export default Contact;
