import OrbitingCircles from '@/components/ui/orbiting-circles';
import GoodImage from '../Common/GoodImage';
// import useIsOnPC from '@/lib/useIsOnPC';

export function OrbitingCirclesDemo() {
  // const isPc = useIsOnPC();
  return (
    <div className="relative flex min-h-[350px] min-w-[350px] md:min-h-[520px] w-full md:min-w-[520px] flex-col items-center justify-center overflow-hidden rounded-lg border dark:bg-gray-700/30 bg-gray-400/20 md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        what I use
      </span>
      {/* core */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={0}
        delay={0}
        radius={0}
      >
        <GoodImage src="/Ts.png" size="50" />
      </OrbitingCircles>
      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={21}
        delay={20}
        radius={100}
      >
        <GoodImage src="/Nextjs.webp" size="50" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={21}
        delay={7}
        radius={100}
      >
        <GoodImage src="/Tailwind.png" size="50" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={21}
        delay={14}
        radius={100}
      >
        <GoodImage src="/FramerMotion.png" size="50" />
      </OrbitingCircles>
      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={220}
        duration={40}
        delay={0}
        reverse
      >
        <GoodImage src="/Nginx.png" size="50" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={220}
        duration={40}
        delay={10}
        reverse
      >
        <GoodImage src="/Nestjs.png" size="50" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={220}
        duration={40}
        delay={20}
        reverse
      >
        <GoodImage src="/Prisma-c.png" size="50" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={220}
        duration={40}
        delay={30}
        reverse
      >
        <GoodImage src="/Mysql.png" size="50" />
      </OrbitingCircles>
    </div>
  );
}
