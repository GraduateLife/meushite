export type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string | string[];
  urls: {
    previewUrl?: string;
    sourceUrl: string;
  };
  notes?: string;
  technologies: {
    name: string;
    iconUrl: string;
  }[];
};

const EshopFrontend: ProjectCardProps = {
  urls: {
    sourceUrl: 'https://github.com/GraduateLife/ts-project-client',
  },
  title: 'Ecommerce (Frontend)',
  description: 'An attempt to combine nextjs and nestjs - ui part',
  imageUrl: [
    '/Eshop/preview1.png',
    '/Eshop/preview2.png',
    '/Eshop/preview3.png',
  ],
  notes:
    'It uses latest features of nextjs (server components and server actions), plus shadcn/ui, extra features:\n - Client side pagination\n - Client side request cache \n - Stripe payment \n - Containerization',
  technologies: [
    {
      name: 'Nextjs',
      iconUrl: '/Nextjs.webp',
    },
    {
      name: 'Tailwind',
      iconUrl: '/iTailwind.png',
    },
    {
      name: 'Stripe',
      iconUrl: '/Stripe.png',
    },
    {
      name: 'Docker',
      iconUrl: '/Docker.png',
    },
  ],
};

const EshopBackend: ProjectCardProps = {
  urls: {
    sourceUrl: 'https://github.com/GraduateLife/ts-project-backend',
  },
  title: 'Ecommerce (Api)',
  description: 'An attempt to combine nextjs and nestjs - api part',
  imageUrl: '/Nestjs.png',
  notes:
    'It is a classic MVC architecture backend, but still introduced a range of innovative features: \n - Command script to create mock data and enable migration (inspired by dotnet) \n - Redis Pub/Sub to derive Email sending service \n - Extra decorators to make it easier to use authentication/authorization\n -Crud code generation and auto swagger integration (also inspired by dotnet)\n - File storage service by Aliyun OSS',
  technologies: [
    {
      name: 'Nestjs',
      iconUrl: '/Nestjs.png',
    },
    {
      name: 'Typeorm',
      iconUrl: '/Typeorm.png',
    },
    {
      name: 'Socket.io',
      iconUrl: '/Sockio.png',
    },
    {
      name: 'Mysql',
      iconUrl: '/Mysql.png',
    },
    {
      name: 'Elasticsearch',
      iconUrl: '/Elasticsearch.png',
    },
    {
      name: 'Yargs (Cli tool)',
      iconUrl: '/YargsCli.png',
    },
  ],
};

const BetterDoc: ProjectCardProps = {
  urls: {
    sourceUrl: 'https://github.com/GraduateLife/better-doc',
  },
  title: 'BetterDoc',
  description: 'It was my personal website!',
  imageUrl: '/Nestjs.png',
  technologies: [],
};

export const projectData: ProjectCardProps[] = [EshopFrontend, EshopBackend];
