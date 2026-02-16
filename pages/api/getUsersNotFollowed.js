import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Follower from "@/models/Follower";
import mongoose from "mongoose";

export default async function handler(req, res) {
  console.log("//////////////////////////////////");

  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const objectId = new mongoose.Types.ObjectId(session.user?.id);

  // 1️⃣ récupérer tous les users que je follow déjà
  const following = await Follower.find({ source: objectId }).select(
    "destination -_id",
  );

  const followingIds = following.map((f) => f.destination);
  // 2️⃣ récupérer les users qui ne sont PAS dans cette liste
  const users = await User.find({
    _id: { $nin: [...followingIds, objectId] }, // exclure aussi moi-même
  });
  console.log(users);
  res.json(users);
}
