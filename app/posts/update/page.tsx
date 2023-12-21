"use client";

import Form from "@components/Form";
import Prompt from "@models/prompts";
import User from "@models/users";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const postId = useSearchParams().get("id");
  const [post, setPost] = useState<Prompt>({
    prompt: "",
    createdAt: new Date().toISOString(),
    updatedAt: "never",
    tags: [],
    user: {
      email: "",
      userName: "",
      image: "",
    } as User,
    id: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/post/${postId}`);
      const data = await res.json();
      setPost(data);
    };

    if (postId) fetchPost();
  }, [postId]);

  const updatePost = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/post/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
        }),
      });

      if (!res.ok) throw Error(res.statusText);
      alert("Post updated successfully!");
      router.push("/profile");
    } catch (e: any) {
      throw Error(e.message);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePost;
