'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GlareCard } from '@/components/ui/glare-card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconExternalLink } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { DialogWrapper } from '../Common/DialogWrapper';
import { ProjectCardProps, projectData } from '@/whoami/projects';
import AvatarGroup from '../Common/AvatarGroup';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CardStack } from '@/components/ui/card-stack';
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from '@/components/ui/carousel';
import { Carousel } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

const ProjectCard = ({
  title,
  description,
  imageUrl,
  technologies,
}: ProjectCardProps) => {
  return (
    <div className="w-[300px]">
      <GlareCard
        className="flex flex-col justify-between relative"
        sizeClassName="w-full"
      >
        {Array.isArray(imageUrl) ? (
          <div
            className="w-full h-[70%] bg-cover"
            style={{ backgroundImage: `url(${imageUrl[0]})` }}
            role="img"
            aria-label={`Preview image for ${title}`}
          />
        ) : (
          <div
            className="w-full h-[70%] bg-cover"
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="img"
            aria-label={`Preview image for ${title}`}
          />
        )}
        <article className="px-6 my-3">
          <h3 className="font-bold text-white text-lg">{title}</h3>
          <p className="font-normal text-base text-neutral-200 mt-2">
            {description}
          </p>
          <ul
            className="flex gap-2 mt-2"
            aria-label={`Technologies used in ${title}`}
          >
            <AvatarGroup urls={technologies.map((tech) => tech.iconUrl)} />
          </ul>
        </article>
      </GlareCard>
    </div>
  );
};

const ProjectPopover = ({
  title,
  description,
  imageUrl,
  urls,
  technologies,
  notes,
}: ProjectCardProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <DialogContent className="max-w-3xl bg-white/85 dark:bg-stone-900/80">
      <div className=" flex flex-col gap-6">
        {/* Header Section */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {/* Left Column - Image */}
          {/* <div className="relative rounded-lg overflow-hidden"> */}
          <div>
            {Array.isArray(imageUrl) ? (
              <>
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 2000,
                    }),
                  ]}
                >
                  <CarouselContent>
                    {imageUrl.map((url, index) => (
                      <CarouselItem key={url}>
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={url}
                            alt={`${title} preview ${index}`}
                            className="absolute inset-0 object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  Slide {current} of {count}
                </div>
              </>
            ) : (
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={imageUrl}
                  alt={`${title} preview`}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </AspectRatio>
            )}
          </div>
          {/* </div> */}

          {/* Right Column - Details */}
          <div className="flex flex-col gap-6">
            {/* Technologies Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Image
                      width={20}
                      height={20}
                      src={tech.iconUrl}
                      alt={tech.name}
                      className="rounded-full object-cover"
                    />
                    <span>{tech.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
            {notes && (
              <div>
                <h3 className="text-lg font-semibold ">Notes</h3>
                <div className="whitespace-pre-wrap">{notes}</div>
              </div>
            )}

            {/* Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Links</h3>
              <div className="flex gap-4">
                <Button asChild variant={'secondary'}>
                  {urls.previewUrl && (
                    <Link
                      href={urls.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-lg px-4 py-2"
                    >
                      <span className="text-stone-700 dark:text-stone-300">
                        Live Preview
                      </span>
                      <IconExternalLink
                        size={16}
                        className="stroke-stone-700 dark:stroke-stone-300"
                      />
                    </Link>
                  )}
                </Button>
                <Button asChild variant={'secondary'}>
                  <Link
                    href={urls.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-lg px-4 py-2"
                  >
                    <span className="text-stone-700 dark:text-stone-300">
                      Source Code
                    </span>
                    <IconBrandGithub
                      size={16}
                      className="stroke-stone-700 dark:stroke-stone-300"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const ProjectDialog = ({
  title,
  description,
  imageUrl,
  urls,
  technologies,
  notes,
}: ProjectCardProps) => {
  return (
    <>
      <DialogWrapper
        TriggerComponent={
          <ProjectCard
            title={title}
            description={description}
            imageUrl={imageUrl}
            urls={urls}
            technologies={technologies}
          />
        }
        ContentComponent={
          <ProjectPopover
            title={title}
            description={description}
            imageUrl={imageUrl}
            urls={urls}
            technologies={technologies}
            notes={notes}
          ></ProjectPopover>
        }
      ></DialogWrapper>
    </>
  );
};

export function ProjectShowcase() {
  return (
    <div
      className="flex flex-col md:grid md:grid-cols-2 gap-4"
      role="list"
      aria-label="Project showcase"
    >
      {projectData.map((project) => (
        <ProjectDialog
          key={project.title}
          urls={project.urls}
          title={project.title}
          description={project.description}
          imageUrl={project.imageUrl}
          technologies={project.technologies}
          notes={project.notes}
        />
      ))}
    </div>
  );
}
