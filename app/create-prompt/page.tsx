'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '../../components/Form';
import { useRouter } from 'next/navigation';

type User = {
  email?: string;
  id: string;
  image?: string;
  name?: string;
};

type SessionData = {
  user: User;
  expires: string;
};

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession() as { data: SessionData | null };
  console.log(session);

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });

  const createPrompt = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
