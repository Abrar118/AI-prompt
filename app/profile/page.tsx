"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Prompt from "@models/prompts";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Prompt[]>([]);

  const handleEdit = (post: Prompt) => {
    router.push(`/posts/update?id=${post.id}`);
  };

  const handleDelete = async (post: Prompt) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirm) {
      const deleted = await fetch(`/api/post/${post.id}`, {
        method: "DELETE",
      });

      if (deleted.ok) {
        const newPosts = posts.filter((p) => p.id !== post.id);
        setPosts(newPosts);
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const repost = await fetch(`/api/users/${session?.user?.email}/post`);
      const data = await repost.json();
      setPosts(data);
    };

    if (session?.user) fetchPost();
  }, []);

  return (
    <Profile
      name={"My"}
      desc={"Welcome to your profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
