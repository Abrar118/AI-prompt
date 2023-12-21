import Prompt from "@models/prompts";
import { createConnection } from "@utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await createConnection();
  const id = params.id;
  const posts = await db
    .collection<Prompt>("prompts")
    .findOne({ id: id })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return new Response(JSON.stringify(posts), { status: 200 });
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await createConnection();
  const id = params.id;
  const { prompt, tags } = await req.json();

  const response = await db.collection<Prompt>("prompts").updateOne(
    { id: id },
    {
      $set: { prompt: prompt, tags: tags },
    }
  );

  return new Response(JSON.stringify(response), { status: 200 });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await createConnection();
  const id = params.id;
  const response = await db
    .collection<Prompt>("prompts")
    .deleteOne({ id: id });

  return new Response(JSON.stringify(response), { status: 200 });
};
