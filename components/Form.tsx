import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Prompt from "@models/prompts";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: {
  type: string;
  post: Prompt;
  setPost: Dispatch<SetStateAction<Prompt>>;
  submitting: boolean;
  handleSubmit: any;
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share your post with the world!
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 galssmorphism"
      >
        <label htmlFor="prompt">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            AI Prompts
          </span>
          <textarea
            name="prompt"
            id="prompt"
            cols={30}
            rows={10}
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Enter your prompt here"
            required
            className="form_textarea border-2 border-gray-300 rounded-md p-2 resize-none"
          />
        </label>

        <label htmlFor="tags">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
          </span>
          <input
            name="tags"
            id="tags"
            value={post.tags.join(",")}
            onChange={(e) =>
              setPost({ ...post, tags: e.target.value.split(",") })
            }
            placeholder="Space separated tags (e.g. #tag1 #tag2)"
            required
            className="form_input border-2 border-gray-300 rounded-md p-2 resize-none"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-5">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white font-semibold "
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
