'use client';
import { ConfettiButton } from '@/components/ui/confetti';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
type CopyToClipboardProps = {
  text: string;
  className?: string;
};

export function CopyButton({ text, className }: CopyToClipboardProps) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (copied) return;
    try {
      copyToClipboard(text);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (_error) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Cannot copy to your clipboard!',
      });
    }
  };

  return (
    <div className={cn('relative', className)} onClick={handleCopy}>
      <ConfettiButton variant="ghost">
        {copied ? (
          <IconCheck className="h-6 w-6 text-green-500" />
        ) : (
          <IconCopy className="h-6 w-6 text-black dark:text-white" />
        )}
      </ConfettiButton>
    </div>
  );
}
