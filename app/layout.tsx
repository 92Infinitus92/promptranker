import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '../components/Nav';
import Provider from '../components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PromptRanker',
  description:
    'Create account and share yopur best prompts with the world! Get ranked 1st!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-[#FAEBD7]'>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
