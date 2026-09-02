import { model, Schema } from "mongoose";

const outboxSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },

    aggregateId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },

    processed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Outbox = new model("Outbox", outboxSchema);
