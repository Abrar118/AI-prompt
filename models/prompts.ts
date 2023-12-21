import User from "./users";

interface Prompt {
  prompt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  user: User;
  id: string;
}

export default Prompt;
