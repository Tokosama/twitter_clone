import multiparty from "multiparty";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3"; //pour gere la connexion avec aws
import fs from "fs"; // pour pouvoir convertir limage quon obtiens avec multiparty
import mime from "mime-types";
import { initMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "@/models/User";

const bucketName = "twitter-clone-tokosama2";
export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const s3Client = new S3({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }

    const type = Object.keys(files)[0];
    const fileInfo = files[type][0];

    const ext = fileInfo.path.split(".").pop();
    const filename = Date.now() + "." + ext;

    const fileContent = fs.readFileSync(fileInfo.path);
    // Configuration de l'upload

    // Upload avec PutObjectCommand
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: fileContent,
        ACL: "public-read",

        ContentType: mime.lookup(fileInfo.path),
      })
    );
    const link = `https://twitter-clone-tokosama2.s3.amazonaws.com/${filename}`;
    if (type === "cover" || type === "image") {
     await User.findByIdAndUpdate(
        session?.user.id,
        {
          [type]: link,
        },
        { new: true }
      );
    }

    res.json({ link, src: link });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
