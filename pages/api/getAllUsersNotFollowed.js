import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Follower from "@/models/Follower";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await initMongoose();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const objectId = new mongoose.Types.ObjectId(session.user.id);

  // 1️⃣ users déjà follow
  const following = await Follower.find({ source: objectId }).select("destination -_id");

  const followingIds = following.map(f => f.destination);

  // 2️⃣ récupérer tous les users non follow + pas moi
  const users = await User.find({
    _id: { $nin: [...followingIds, objectId] }
  });

  res.json(users);
}
