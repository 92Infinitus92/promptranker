'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from 'next-auth/react';

interface Provider {
  name: string | null;
  id: any | null;
}

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<
    Record<string, ClientSafeProvider>
  >({});
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      // Ensure that providers is an object, even if res is null or empty
      const transformedProviders: Record<string, ClientSafeProvider> =
        res || {};

      setProviders(transformedProviders);
    };

    fetchProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3 px-10'>
      <Link href={'/'} className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>PromptRanker</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href={'/create-prompt'} className='black_btn'>
              Create Post
            </Link>
            <button
              type='button'
              onClick={() => signOut()}
              className='outline_btn'
            >
              Sign Out
            </button>
            <Link href={'/profile'}>
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  alt='profile_pic'
                  width={37}
                  height={37}
                  className='rounded-full'
                />
              )}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                alt='profile_pic'
                width={37}
                height={37}
                className='rounded-full'
                onClick={() => {
                  setToggleDropdown((prevState) => !prevState);
                }}
              />
            )}

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href={'/profile'}
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={'/create-prompt'}
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => signOut()}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
            {/* <button
              type='button'
              onClick={() => signOut()}
              className='outline_btn'
            >
              Sign Out
            </button> */}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
