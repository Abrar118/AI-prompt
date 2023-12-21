"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Prompt from "@models/prompts";

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  post: Prompt;
  handleTagClick?: any;
  handleEdit?: any;
  handleDelete?: any;
}) => {
  const [copy, setCopy] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopy(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.user.image}
            alt="user profile"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.user.userName}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.user.email}
            </p>
          </div>
        </div>

        <div
          className="copy_btn"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={copy ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient flex flex-wrap gap-3">
        {post.tags.map((tag) => (
          <span
            onClick={() => handleTagClick(tag)}
            className="tag cursor-pointer"
          >
            {tag}{" "}
          </span>
        ))}
      </p>

      {session?.user?.email === post.user.email && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 ">
          <button
            className="font-inter text-sm cursor-pointer black_btn"
            onClick={handleEdit}
          >
            Edit
          </button>
          <p
            className="font-inter text-sm cursor-pointer outline_btn"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
