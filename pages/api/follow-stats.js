import { initMongoose } from "@/lib/mongoose";
import Follower from "@/models/Follower";

export default async function handler(req, res) {
  await initMongoose();
  const { userId } = req.query;
  const followers = await Follower.countDocuments({ destination: userId });
  const following = await Follower.countDocuments({ source: userId });

  res.json({ followers, following });
}
