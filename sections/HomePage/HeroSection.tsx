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
    <main className="flex flex-col justify-between px-4">
      <div className="w-full">
        <h1 className="mb-16 text-7xl">What's up!</h1>
        <section className="my-4 text-2xl" aria-label="Introduction">
          <div>
            <h2>
              <span>I'm Eddie Zhang, I am a web developer based in </span>
              <span className="text-2xl text-red-500 dark:text-red-600">
                Por
              </span>
              <span className="text-2xl text-green-600">tugal</span>
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
            <span className="font-bold text-emerald-500 dark:text-emerald-400">
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
            className="group/email-btn relative flex w-fit justify-center overflow-hidden bg-cyan-500 font-bold dark:bg-cyan-700 dark:text-black"
            onClick={handleOpenMailClient}
            aria-label="Send email"
          >
            <span className="text-center text-white transition-transform duration-500 group-hover/email-btn:translate-x-40">
              Send Email
            </span>
            <span className="absolute inset-0 flex -translate-x-40 items-center justify-center text-white transition-transform duration-500 group-hover/email-btn:translate-x-0">
              📮
            </span>
          </Button>
        </li>
        <span>or</span>
        <li>
          <Button
            className="group/msg-btn relative flex w-fit justify-center overflow-hidden bg-black font-bold text-white dark:bg-gray-100 dark:text-black"
            asChild
            aria-label="Navigate to contact page"
          >
            <NVTLink href="/contact">
              <span className="text-center transition-transform duration-500 group-hover/msg-btn:translate-x-40">
                Go To Contact
              </span>
              <span className="absolute inset-0 flex -translate-x-40 items-center justify-center text-white transition-transform duration-500 group-hover/msg-btn:translate-x-0">
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
            className="inline-flex bg-black font-bold text-white ring-2 ring-white hover:bg-slate-800"
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
            className="inline-flex bg-blue-700 font-bold text-white ring-2 ring-blue-900 hover:bg-blue-800"
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
            className="inline-flex bg-green-700 font-bold text-white ring-2 ring-green-900 hover:bg-green-800"
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
