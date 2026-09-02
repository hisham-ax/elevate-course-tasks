import mongoose from "mongoose";
import { User, Outbox } from "./userModel.js";
import processOutbox from "./worker.js";

export const updateUser = async (userId, name) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $set: { name } },
        { session },
      );

      await Outbox.create(
        [
          {
            type: "UPDATE_USER",
            aggregateId: userId,
            payload: {
              name,
            },
          },
        ],
        { session },
      );
      await Outbox.save();
    });
  } finally {
    await session.endSession();
  }
};
