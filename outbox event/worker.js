import { Outbox } from "./outboxModel";

export async function workerProcess() {
  const events = await Outbox.find({ processed: false });

  for (const event of events) {
    try {
      switch (event.type) {
        case "UPDATE_USER":
          await redis.del(`user:${event.aggregateId}`);
          break;
      }
      await Outbox.findByIdAndUpdate(
        { type: "UPDATE_USER", aggregateId: userId, processed: true },
        { session },
      );
      await Outbox.save();
    } catch (error) {
      console.error("Outbox processing failed", error);
    }
  }
}
