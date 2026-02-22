import Follower from "@/models/Follower";
import mongoose from "mongoose";

export default async function getFollowStats(userId) {
  if (!userId) return { followers: 0, following: 0 };

  const objectId = new mongoose.Types.ObjectId(userId);

  console.log("mongo state:", mongoose.connection.readyState);

  const [followers, following] = await Promise.all([
    Follower.countDocuments({ destination: objectId }),
    Follower.countDocuments({ source: objectId }),
  ]);
  return { followers, following };
}
