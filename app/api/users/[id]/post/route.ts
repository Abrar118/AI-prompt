import Prompt from "@models/prompts";
import { createConnection } from "@utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await createConnection();
  const user = params.id;
  const posts = await db
    .collection<Prompt>("prompts")
    .find({ "user.email": user })
    .toArray()
    .catch((err) => {
      console.log(err);
      return [];
    });

  return new Response(JSON.stringify(posts), { status: 200 });
};
