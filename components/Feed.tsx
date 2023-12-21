"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Prompt from "@models/prompts";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Prompt[];
  handleTagClick: any;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt.user.email}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Prompt[]>([]);
  const [searchTimeout, setSearchTimeout] = useState(null) as any;
  const [searchedResults, setSearchedResults] = useState<Prompt[]>([]);

  const handleSearch = async (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(`.*${searchtext}.*`, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.user.userName) ||
        regex.test(item.tags.join(" ")) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const repost = await fetch("/api/post");
      const data = await repost.json();
      setPosts(data);
    };

    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search by tag or username or prompt content"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer border-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600 w-full h-10 px-2 pl-2 rounded-lg text-sm transition-all duration-200 ease-in-out"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
