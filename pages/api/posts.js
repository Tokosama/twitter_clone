import { initMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Post from "@/models/Post";
import Like from "@/models/Like";
import Follower from "@/models/Follower";

export default async function handler(req, res) {
  try {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ error: "Not authenticated" });

    if (req.method === "GET") {
      // ton code GET...
    } else if (req.method === "POST") {
      const { text, parent, images } = req.body;
      if (!text && (!images || images.length === 0)) {
        return res.status(400).json({ error: "Text or images required" });
      }

      const post = await Post.create({
        author: session.user.id,
        text,
        parent,
        images,
      });

      if (parent) {
        const parentPost = await Post.findById(parent);
        if (parentPost) {
          parentPost.commentsCount = await Post.countDocuments({ parent });
          await parentPost.save();
        }
      }
      res.json(post);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error("API /posts error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
