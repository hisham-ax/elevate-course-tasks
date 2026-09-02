import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userID: { type: mongoose.Types.ObjectId, require: true },
  name: { type: String, require: true },
});

export const User = mongoose.model("User", userSchema);
