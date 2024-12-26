'use client';

import { Button } from '@/components/ui/button';
import Typewriter from 'typewriter-effect';
import GithubSvg from '@/components/ui/tabler-icons/Github.svg';
import Link from 'next/link';
import { LinkedInIcon } from '@/components/ui/tabler-icons/LinkedIn.svg';
import { WeChatIcon } from '@/components/ui/tabler-icons/Wechat.svg';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useCopyToClipboard } from 'react-use';

import { Link as NVTLink } from 'next-view-transitions';
import { emailAddress, githubAddress, linkedinAddress } from '@/whoami/links';

const ICanDo = () => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString('write TypeScript')
          .pauseFor(1000)
          .deleteAll()
          .typeString('work with Nextjs')
          .pauseFor(1000)
          .deleteAll()
          .typeString('mastered Nodejs')
          .pauseFor(1000)
          .deleteAll()
          .typeString('know CI/CD')
          .pauseFor(1000)
          .deleteAll()
          .typeString('am FullSt')
          .deleteChars(9)
          .typeString('make job done.')
          .start();
      }}
    />
  );
};

export const Story = () => {
  return (
    <main className="flex flex-col px-4  justify-between">
      <div className="w-full">
        <h1 className="text-7xl mb-16">What's up!</h1>
        <section className="my-4 text-2xl" aria-label="Introduction">
          <div>
            <h2>
              <span>I'm Eddie Zhang, I am a web developer based in </span>
              <span className="dark:text-red-600 text-red-500 text-2xl">
                Por
              </span>
              <span className="text-green-600 text-2xl">tugal</span>
              <span>, </span>
            </h2>

            <div className="flex flex-wrap gap-1">
              <span>and I </span>
              <ICanDo />
            </div>
          </div>
        </section>

        <section className="my-4 text-2xl" aria-label="Experience">
          <p>
            With 3 years of working experience, I create responsive and
            accessible pages using Next.js and am capable of developing
            server-side programs within the Node.js ecosystem.
          </p>
        </section>

        <section className="my-4 text-2xl" aria-label="Contact information">
          <p>
            Currently I am{' '}
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">
              open{' '}
            </span>
            for collaborations, feel free to contact me
          </p>
          <div className="flex items-center justify-center md:block">
            <SendMessage />
          </div>

          {/* <p className="text-2xl my-4">Besides, you can also find me on</p>
          <SocialMedia /> */}
        </section>
      </div>
    </main>
  );
};

export const SendMessage = () => {
  const router = useRouter();
  const [, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast();
  const handleOpenMailClient = () => {
    try {
      // throw new Error('test');
      toast({
        variant: 'default',
        title: 'Be aware!',
        description: 'Your mail client is opening...',
      });
      router.push(`mailto:${emailAddress}`);
    } catch (error) {
      copyToClipboard(emailAddress);
      toast({
        variant: 'destructive',
        title: 'Oh no! Cannot open your mail client!',
        description: 'My Email is copied in your clipboard instead',
        action: <ToastAction altText="Okay...">Okay...</ToastAction>,
      });
    }
  };

  return (
    <nav className="my-2" aria-label="Contact options">
      <ul className="inline-flex items-center gap-2">
        <li>
          <Button
            className="dark:bg-cyan-700 bg-cyan-500 dark:text-black flex justify-center group/email-btn relative w-fit overflow-hidden font-bold"
            onClick={handleOpenMailClient}
            aria-label="Send email"
          >
            <span className="group-hover/email-btn:translate-x-40 text-center transition-transform duration-500 text-white">
              Send Email
            </span>
            <span className="-translate-x-40 group-hover/email-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition-transform duration-500 text-white">
              📮
            </span>
          </Button>
        </li>
        <span>or</span>
        <li>
          <Button
            className="bg-black dark:bg-gray-100 dark:text-black text-white flex justify-center group/msg-btn relative w-fit overflow-hidden font-bold"
            asChild
            aria-label="Navigate to contact page"
          >
            <NVTLink href="/contact">
              <span className="group-hover/msg-btn:translate-x-40 text-center transition-transform duration-500">
                Go To Contact
              </span>
              <span className="-translate-x-40 group-hover/msg-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition-transform duration-500 text-white">
                🌐
              </span>
            </NVTLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
const SocialMedia = () => {
  return (
    <nav aria-label="Social media links">
      <ul className="inline-flex gap-6 px-2">
        <li>
          <Button
            className="font-bold bg-black text-white ring-white ring-2 hover:bg-slate-800 inline-flex"
            aria-label="Visit my Github profile"
            asChild
          >
            <Link
              href={githubAddress}
              rel="noopener noreferrer"
              target="_blank"
            >
              {' '}
              <GithubSvg />
              <span>Github</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            className="font-bold bg-blue-700 text-white ring-blue-900 ring-2 hover:bg-blue-800 inline-flex"
            aria-label="Visit my LinkedIn profile"
            asChild
          >
            <Link
              href={linkedinAddress}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            className="font-bold bg-green-700 text-white ring-green-900 ring-2 hover:bg-green-800 inline-flex"
            aria-label="Contact me on WeChat"
          >
            <WeChatIcon />
            <span>Wechat</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
