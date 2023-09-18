import mongoose, { Schema, Document } from "mongoose";

interface ISection extends Document {
  name: string;
  isAvailable: boolean;
  hoursOfAvailability: Array<{
    day: string;
    start: string;
    end: string;
  }>;
}

const sectionSchema = new Schema<ISection>({
  name: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  hoursOfAvailability: [
    {
      day: { type: String, required: true },
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
});

export const SectionModel = mongoose.model<ISection>("Section", sectionSchema);
