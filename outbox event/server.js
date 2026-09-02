import { updateUser } from "./outbox_event.js";
import { workerProcess } from "./worker.js";

async function simulatWorkThrough() {
  let name = "hisham";
  const userID = "123";
  updateUser(userID, name);
}
