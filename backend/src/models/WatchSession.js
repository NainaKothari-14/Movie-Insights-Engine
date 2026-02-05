import mongoose from "mongoose";

const WatchSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    watchedAt: { type: Date, required: true },
    minutesWatched: { type: Number, required: true, min: 0 },
    device: { type: String, enum: ["mobile", "web", "tv"], required: true },
  },
  { collection: "watch_sessions" }
);

// Must-have indexes
WatchSessionSchema.index({ watchedAt: 1 });
WatchSessionSchema.index({ movieId: 1, watchedAt: 1 });
WatchSessionSchema.index({ userId: 1, watchedAt: 1 });

export const WatchSession = mongoose.model("WatchSession", WatchSessionSchema);
