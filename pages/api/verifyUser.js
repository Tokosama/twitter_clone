import { initMongoose } from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import mongoose from "mongoose";

export default async function handler(req, res) {
  console.log("VERIFY USER API");
  
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  await initMongoose();
  
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  
  const userId = session.user.id;
  
  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }
  
  console.log("VERIFY USER API000000000000000000000", userId);
  try {
    const objectId = new mongoose.Types.ObjectId(userId);

    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      { verified: true },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
console.log("************************--------------+++++++++++++")
console.log(updatedUser)
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
