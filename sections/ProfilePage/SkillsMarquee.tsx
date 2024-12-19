'use client';
import Marquee from '@/components/ui/marquee';
import { into } from '@/lib/into';
import { cn } from '@/lib/utils';
import { Skill, skills } from '@/whoami/skills';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@radix-ui/react-tooltip';
import Image from 'next/image';
const [firstRow, secondRow, thirdRow] = into<Skill>(3)(skills);

const SkillCard = ({
  imgUrl,
  name,
  tagline,
  side,
}: Skill & { side: 'top' | 'bottom' }) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <figure
              className={cn(
                'relative w-fit cursor-pointer overflow-hidden rounded-full border py-2 px-4',
                // light styles
                'border-gray-950/[.1] bg-gray-950/[.03] hover:bg-gray-950/[.05]',
                // dark styles
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
              )}
            >
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full"
                  width="26"
                  height="26"
                  alt={name}
                  src={imgUrl}
                />
                <figcaption className="text-sm font-medium dark:text-white">
                  {name}
                </figcaption>
              </div>
            </figure>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>{tagline}</p>
            <TooltipArrow className="fill-white"></TooltipArrow>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export function SkillsMarquee() {
  return (
    <div className="relative flex w-[520px] flex-col py-3 items-center justify-center overflow-hidden rounded-lg  ">
      <Marquee pauseOnHover className="[--duration:20s] pt-6">
        {firstRow.map((sk) => (
          <SkillCard key={sk.name} {...sk} side="top" />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] pt-6">
        {secondRow.map((sk) => (
          <SkillCard key={sk.name} {...sk} side="top" />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s] pt-6">
        {thirdRow.map((sk) => (
          <SkillCard key={sk.name} {...sk} side="top" />
        ))}
      </Marquee>
    </div>
  );
}
