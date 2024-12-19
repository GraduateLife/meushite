'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CopyButton } from '@/sections/Common/CopyButton';
import { DialogWrapper } from '@/sections/Common/DialogWrapper';
import {
  githubAddress,
  linkedinAddress,
  emailAddress,
  domainUrl,
} from '@/whoami/links';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconEye, IconQrcode } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Metadata } from 'next';

export default function ContactPage() {
  const links = [
    {
      name: 'GitHub',
      action: 'redirect',
      url: githubAddress,
    },
    {
      name: 'LinkedIn',
      action: 'redirect',
      url: linkedinAddress,
    },
    {
      name: 'Email',
      action: 'copy',
      url: emailAddress,
    },
    {
      name: 'Wechat',
      action: 'dialog',
      url: '/wechat-qrcode.jpg',
    },
  ];

  const LinkComponent = ({ link }: { link: (typeof links)[0] }) => {
    switch (link.action) {
      case 'redirect':
        return (
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {link.url}
          </Link>
        );
      case 'copy':
        return (
          <div className="flex items-center gap-2">
            <div className="text-blue-600 select-all">{link.url}</div>
            <CopyButton text={link.url} />
          </div>
        );
      case 'dialog':
        return (
          <div className="flex items-center gap-2">
            <DialogWrapper
              TriggerComponent={
                <IconQrcode className="w-6 h-6 hover:text-green-600" />
              }
              ContentComponent={
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{link.name}</DialogTitle>
                  </DialogHeader>
                  <Image
                    src={link.url}
                    alt={link.name}
                    width={300}
                    height={300}
                  />
                </DialogContent>
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.ul
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.li variants={item}>
          <span className="text-gray-500 font-thin" role="doc-subtitle">
            talk to a normal person
          </span>
        </motion.li>
        {links.map((link) => (
          <motion.li
            key={link.name}
            className="flex items-center gap-2"
            variants={item}
          >
            <p className="min-w-[100px]">{link.name}</p>
            <LinkComponent link={link} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
