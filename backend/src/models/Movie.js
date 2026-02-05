import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genres: { type: [String], default: [] }, // ["Action","Drama"]
    releaseYear: { type: Number, required: true },
    durationMins: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "movies" }
);

// Must-have index
MovieSchema.index({ genres: 1 });

export const Movie = mongoose.model("Movie", MovieSchema);
