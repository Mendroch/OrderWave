import mongoose, { Schema, Document } from "mongoose";

interface ISection extends Document {
  name: string;
  isAvailable: boolean;
  hoursOfAvailability: Array<{
    start: string;
    end: string;
  }>;
}

const sectionSchema = new Schema<ISection>({
  name: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  hoursOfAvailability: [
    {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
});

export const SectionModel = mongoose.model<ISection>("Section", sectionSchema);
