import { SkillsMarquee } from '@/sections/ProfilePage/SkillsMarquee';
import { Metadata } from 'next';
import Image from 'next/image';
import { ProjectShowcase } from '@/sections/ProfilePage/ProjectDialog';

export const metadata: Metadata = {
  title: 'About me',
  description: 'meet a normal person',
};

export default () => {
  return (
    <main
      className="flex w-[80vw] h-full sm:flex-col xl:flex-row mb-10 "
      role="main"
      aria-label="Profile Page"
    >
      <div className="flex flex-col flex-1">
        <span className="text-gray-500" role="doc-subtitle">
          meet a normal person
        </span>
        <section aria-labelledby="basic-info">
          <h2 id="basic-info" className="text-4xl my-3">
            Basic information
          </h2>
          <ul className="my-4" aria-label="Personal details">
            <li>
              NickName: <span aria-label="Nickname">Eddie</span>
            </li>
            <li>
              <div aria-label="Location" className="flex items-center gap-2">
                Location:{' '}
                <Image
                  src={'https://flagcdn.com/cn.svg'}
                  alt="China"
                  width={16}
                  height={16}
                />
                <span>Shanghai, China</span>
                {'/ '}
                <Image
                  src={'https://flagcdn.com/pt.svg'}
                  alt="China"
                  width={16}
                  height={16}
                />
                <span>Lisbon, Portugal</span>
              </div>
            </li>
            <li>
              Experience:{' '}
              <span aria-label="Years of experience">3 years +</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="skills">
          <h2 id="skills" className="text-4xl">
            My skills
          </h2>
          <SkillsMarquee aria-label="Skills showcase" />
        </section>

        <section aria-labelledby="education">
          <h2 id="education" className="text-4xl my-6">
            Education
          </h2>
          <article className="rounded-lg w-[500px] flex justify-between p-2 items-center ">
            <div>
              <p className="my-2">University of Manchester</p>
              <p className="my-2">MEng Electronic Engineering</p>
              <p className="my-2">2018-2023</p>
            </div>
            <Image
              src={'/UOM.png'}
              alt={'University of Manchester logo'}
              width={200}
              height={100}
            />
          </article>
        </section>
      </div>
      <div>
        <div className="flex-1">
          <section aria-labelledby="value-proposition">
            <h2 id="value-proposition" className="text-4xl mb-3 mt-9">
              I bring you
            </h2>
            <ul className="my-4" aria-label="Professional offerings">
              <li>
                Rich experience of Javascript/Typescript on both backend and
                frontend.
              </li>
              <li>
                Clear understanding on cloud integration and containerization
                technology.
              </li>
              <li>
                High productivity form my continuous learning and AI power.
              </li>
            </ul>
          </section>

          <section aria-labelledby="projects">
            <h2 id="projects" className="text-4xl mb-3 mt-9">
              My Projects
            </h2>
            <ProjectShowcase />
          </section>
        </div>
      </div>
    </main>
  );
};

// type ProjectCardProps = {
//   title: string;
//   description: string;
//   imageUrl: string;
//   link: string;
//   technologies: {
//     name: string;
//     iconUrl: string;
//   }[];
// };

// const ProjectCard = ({
//   title,
//   description,
//   imageUrl,
//   link,
//   technologies,
// }: ProjectCardProps) => {
//   return (
//     <div className="w-[300px]">
//       <GlareCard
//         className="flex flex-col justify-between relative"
//         sizeClassName="w-full"
//       >
//         <div
//           className="w-full h-[70%] bg-cover"
//           style={{ backgroundImage: `url(${imageUrl})` }}
//           role="img"
//           aria-label={`Preview image for ${title}`}
//         />

//         <article className="px-6 my-3">
//           <h3 className="font-bold text-white text-lg">{title}</h3>
//           <p className="font-normal text-base text-neutral-200 mt-2">
//             {description}
//           </p>
//           <ul
//             className="flex gap-2 mt-2"
//             aria-label={`Technologies used in ${title}`}
//           >
//             {technologies.map((tech) => (
//               <li key={tech.name}>
//                 <Image
//                   className="border border-gray-700 rounded-full"
//                   width={30}
//                   height={30}
//                   src={tech.iconUrl}
//                   alt={tech.name}
//                 />
//               </li>
//             ))}
//           </ul>
//         </article>
//       </GlareCard>
//     </div>
//   );
// };

// const ProjectDialog = ({
//   title,
//   description,
//   imageUrl,
//   link,
//   technologies,
// }: ProjectCardProps) => {
//   return (
//     <>
//       <DialogWrapper
//         TriggerComponent={
//           <ProjectCard
//             title={title}
//             description={description}
//             imageUrl={imageUrl}
//             link={link}
//             technologies={technologies}
//           />
//         }
//         ContentComponent={
//           <DialogHeader>
//             <DialogTitle>Are you absolutely sure?</DialogTitle>
//             <DialogDescription>
//               This action cannot be undone. This will permanently delete your
//               account and remove your data from our servers.
//             </DialogDescription>
//           </DialogHeader>
//         }
//       ></DialogWrapper>
//     </>
//   );
// };

// export function GlareCardDemo() {
//   return (
//     <div
//       className="flex flex-col md:grid md:grid-cols-2 gap-4"
//       role="list"
//       aria-label="Project showcase"
//     >
//       <ProjectDialog
//         link="/contact"
//         title="The greatest trick"
//         description="The greatest trick the devil ever pulled was to convince the world that he didn't exist."
//         imageUrl="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         technologies={[
//           {
//             name: 'Nextjs',
//             iconUrl: '/Nextjs.webp',
//           },
//         ]}
//       />
//       <GlareCard className="flex flex-col items-center justify-center">
//         <img
//           className="h-full w-full absolute inset-0 object-cover"
//           src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Project preview"
//         />
//       </GlareCard>
//       <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
//         <p className="font-bold text-white text-lg">The greatest trick</p>
//         <p className="font-normal text-base text-neutral-200 mt-4">
//           The greatest trick the devil ever pulled was to convince the world
//           that he didn&apos;t exist.
//         </p>
//       </GlareCard>
//       <GlareCard className="flex flex-col items-center justify-center">
//         <img
//           className="h-full w-full absolute inset-0 object-cover"
//           src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Project preview"
//         />
//       </GlareCard>
//     </div>
//   );
// }
