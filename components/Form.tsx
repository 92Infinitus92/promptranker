import React from 'react';
import Link from 'next/link';

interface Props {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string;
      tag: string;
    }>
  >;
  submitting: boolean;
  handleSubmit: (e: React.SyntheticEvent) => void;
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  return (
    <section className='w-full max-w-full flex-start flex-col text-center mx-auto'>
      <h1 className='head_text text-left mx-auto'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-center max-w-md mx-auto'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism mx-auto'
      >
        <label htmlFor=''>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            className='form_textarea'
          ></textarea>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag{' '}
          </span>
          <span className='font-normal'>
            (#product, #webdevelopment, #idea)
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#tag'
            className='form_input'
            required
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href={'/'} className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
