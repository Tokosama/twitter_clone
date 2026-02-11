import mongoose from "mongoose";
import { initMongoose } from "./mongoose";

let started = false;

export function startKeepAlive() {
  if (started) return;
  started = true;

  setInterval(async () => {
    try {
      await initMongoose();
      await mongoose.connection.db.admin().ping();
      console.log("Mongo keep alive", new Date().toISOString());
    } catch (err) {
      console.error("Ping failed:", err.message);
    }
  }, 24 * 24 * 60 * 60 * 1000);
}