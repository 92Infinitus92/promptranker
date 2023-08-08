'use client';

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data }: { data: any[] }) => {
  return (
    <div className='prompt_layout mt-16'>
      {data.map((post) => (
        <PromptCard />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: { target: { value: string } }) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt/all');
      const data = await res.json();
      setPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form action='' className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />

        <PromptCardList data={posts} />
      </form>
    </section>
  );
};

export default Feed;
