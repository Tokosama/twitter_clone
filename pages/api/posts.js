import { initMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Post from "@/models/Post";
import Like from "@/models/Like";
import Follower from "@/models/Follower";

export default async function handler(req, res) {
  try {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ error: "Not authenticated" });

    if (req.method === "GET") {
      const { id } = req.query;
      const toggleFollow = req.query.toggleFollow === "true";
      const parent = req.query.parent || null;
      const author = req.query.author;

      if (id) {
        const post = await Post.findById(id)
          .populate("author")
          .populate({ path: "parent", populate: "author" });

        return res.json({ post });
      }

      let searchFilter = {};

      if (author) {
        searchFilter.author = author;
      }

      if (parent) {
        searchFilter.parent = parent;
      }

      if (!author && !parent && toggleFollow) {
        const myFollows = await Follower.find({
          source: session?.user.id,
        }).lean();

        const idsOfPeopleIFollow = myFollows.map((f) => f.destination);

        searchFilter.author = {
          $in: [...idsOfPeopleIFollow, session?.user.id],
        };
      }

      const posts = await Post.find(searchFilter)
        .populate("author")
        .populate({ path: "parent", populate: "author" })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      const postsLikedByMe = await Like.find({
        author: session?.user.id,
        post: { $in: posts.map((p) => p._id) },
      }).lean();

      const idsLikedByMe = postsLikedByMe.map((like) => like.post);

      res.json({
        posts,
        idsLikedByMe,
      });
    }
    // Post request
    else if (req.method === "POST") {
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
