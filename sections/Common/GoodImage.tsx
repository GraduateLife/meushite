import Image from 'next/image';

const GoodImage = ({ src, size }: { src: string; size: number | string }) => {
  return (
    <>
      <Image
        src={src}
        width={1000}
        height={1000}
        className={` h-[${Number(size)}px] w-full object-contain `}
        alt="thumbnail"
      />
    </>
  );
};

export default GoodImage;
