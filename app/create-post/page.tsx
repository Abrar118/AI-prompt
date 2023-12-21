"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import Prompt from "@models/prompts";
import User from "@models/users";

const CreatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<Prompt>({
    prompt: "",
    createdAt: new Date().toISOString(),
    updatedAt: "never",
    tags: [],
    user: {
      email: session?.user?.email,
      userName: session?.user?.name,
      image: session?.user?.image,
    } as User,
    id: "",
  });

  const createPost = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/post/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: post,
        }),
      });

      if (!res.ok) throw Error(res.statusText);
      alert("Post created successfully!");
      router.push("/");
    } catch (e: any) {
      throw Error(e.message);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
