import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    joinedAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

export const User = mongoose.model("User", UserSchema);
