'use client';
import { ButtonProps } from '@/components/ui/button';
import { ConfettiButton } from '@/components/ui/confetti';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
type CopyToClipboardProps = {
  text: string;
  containerClassName?: string;
  copyIconClassName?: string;
  checkIconClassName?: string;
} & ButtonProps;

export function CopyButton({
  text,
  containerClassName,
  copyIconClassName,
  checkIconClassName,
  ...props
}: CopyToClipboardProps) {
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
    <div className={cn('relative', containerClassName)} onClick={handleCopy}>
      <ConfettiButton variant="ghost" {...props}>
        {copied ? (
          <IconCheck className={cn('h-6 w-6', checkIconClassName)} />
        ) : (
          <IconCopy className={cn('h-6 w-6', copyIconClassName)} />
        )}
      </ConfettiButton>
    </div>
  );
}
