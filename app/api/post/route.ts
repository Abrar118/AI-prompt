import { createConnection } from "@utils/database";

export const GET = async (req: Request, res: Response) => {
  const db = await createConnection();
  const posts = await db
    .collection("prompts")
    .find()
    .toArray()
    .catch((err) => {
      console.log(err);
      return [];
    });

  return new Response(JSON.stringify(posts), { status: 200 });
};
