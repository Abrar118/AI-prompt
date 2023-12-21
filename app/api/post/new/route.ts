import Prompt from "@models/prompts";
import { createConnection } from "@utils/database";
import { InsertOneResult } from "mongodb";

export const POST = async (req: Request) => {
  const body = (await req.json()) as any;
  const post: Prompt = body.post;

  const db = await createConnection();
  const newPrompt: Prompt = {
    user: post.user,
    prompt: post.prompt,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: post.tags,
    id: "",
  };

  const response = (await db
    .collection<Prompt>("prompts")
    .insertOne(newPrompt)
    .catch((err) => {
      console.error(err);
      return err;
    })) as InsertOneResult<Prompt>;

  const objectId = response.insertedId.toString();

  newPrompt.id = objectId;

  await db
    .collection<Prompt>("prompts")
    .updateOne({ _id: response.insertedId }, { $set: { id: objectId } });

  return new Response(JSON.stringify(response), { status: 201 });
};
