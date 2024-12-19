import Image from 'next/image';

export default function AvatarDemo({ urls }: { urls: string[] }) {
  return (
    <div className="flex -space-x-[0.2rem]">
      {urls.map((url, index) => (
        <Image
          key={url}
          className="rounded-full ring-2 ring-background bg-white"
          src={url}
          width={20}
          height={20}
          alt={`avatar-${index}`}
        />
      ))}
    </div>
  );
}
