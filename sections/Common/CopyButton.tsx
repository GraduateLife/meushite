'use client';

import { ConfettiButton } from '@/components/ui/confetti';
import { cn } from '@/lib/utils';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';

interface CopyToClipboardProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyToClipboardProps) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copied) return;
    try {
      copyToClipboard(text);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {}
  };

  return (
    <div className="relative" onClick={handleCopy}>
      <ConfettiButton variant="ghost">
        {copied ? (
          <IconCheck className="w-6 h-6 text-green-500" />
        ) : (
          <IconCopy className="w-6 h-6 text-black dark:text-white" />
        )}
      </ConfettiButton>
    </div>
  );
}
