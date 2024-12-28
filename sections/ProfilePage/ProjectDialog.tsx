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
    <GlareCard
      className="relative flex flex-col justify-between"
      sizeClassName="w-[360px]"
    >
      {Array.isArray(imageUrl) ? (
        <div
          className="h-[70%] w-full bg-cover"
          style={{ backgroundImage: `url(${imageUrl[0]})` }}
          role="img"
          aria-label={`Preview image for ${title}`}
        />
      ) : (
        <div
          className="h-[70%] w-full bg-cover"
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={`Preview image for ${title}`}
        />
      )}
      <article className="my-3 px-6">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-base font-normal text-neutral-200">
          {description}
        </p>
        <ul
          className="mt-2 flex gap-2"
          aria-label={`Technologies used in ${title}`}
        >
          <AvatarGroup urls={technologies.map((tech) => tech.iconUrl)} />
        </ul>
      </article>
    </GlareCard>
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
    <DialogContent className="max-h-[90vh] max-w-[70vw] overflow-y-auto bg-white/85 dark:bg-stone-900/80">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="mt-2 text-lg">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Main Content */}
        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
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
                            width={1000}
                            height={1000}
                            alt={`${title} preview ${index}`}
                            className="absolute inset-0 h-full w-full object-cover"
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
                  width={1000}
                  height={1000}
                  alt={`${title} preview`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AspectRatio>
            )}
          </div>
          {/* </div> */}

          {/* Right Column - Details */}
          <div className="flex flex-col gap-6">
            {/* Technologies Section */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Technologies</h3>
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
                <h3 className="text-lg font-semibold">Notes</h3>
                <div className="whitespace-pre-wrap">{notes}</div>
              </div>
            )}

            {/* Links Section */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Links</h3>
              <div className="flex gap-4">
                <Button asChild variant={'secondary'}>
                  {urls.previewUrl && (
                    <Link
                      href={urls.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 transition-colors hover:bg-neutral-700"
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
                    className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 transition-colors hover:bg-neutral-700"
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
      className="flex flex-col items-center gap-4 md:grid md:grid-cols-2"
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
