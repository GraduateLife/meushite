import { SkillsMarquee } from '@/sections/ProfilePage/SkillsMarquee';
import { Metadata } from 'next';
import Image from 'next/image';
import { ProjectShowcase } from '@/sections/ProfilePage/ProjectDialog';
import { globalTitleSuffix } from '@/whoami/links';

export const metadata: Metadata = {
  title: 'About Me' + globalTitleSuffix,
  description:
    'Full Stack Developer with 3+ years of experience in Next.js, Node.js, and cloud technologies. Based in Shanghai and Lisbon.',
  keywords: [
    'full stack developer',
    'web development',
    'nextjs developer',
    'typescript',
    'javascript',
    'cloud integration',
    'shanghai',
    'lisbon',
    'electronic engineering',
    'software engineer',
  ],
};

const Page = () => {
  return (
    <>
      <div className="flex min-w-[400px] flex-col">
        <span className="text-gray-500" role="doc-subtitle">
          meet a normal person
        </span>
        <section aria-labelledby="basic-info">
          <h2 id="basic-info" className="my-3 text-4xl">
            Basic information
          </h2>
          <ul className="my-4" aria-label="Personal details">
            <li className="flex items-center gap-2">
              <span>NickName: </span>
              <span aria-label="Nickname">Eddie</span>
            </li>
            <li>
              <div aria-label="Location" className="flex flex-wrap gap-2">
                <span>Location:</span>
                <div className="inline-flex items-center gap-2">
                  <Image
                    src={'https://flagcdn.com/cn.svg'}
                    alt="China"
                    width={16}
                    height={16}
                  />
                  <span>Shanghai, China</span>
                  {'/ '}
                </div>
                <div className="inline-flex items-center gap-2">
                  <Image
                    src={'https://flagcdn.com/pt.svg'}
                    alt="China"
                    width={16}
                    height={16}
                  />
                  <span>Lisbon, Portugal</span>
                </div>
              </div>
            </li>
            <li>
              <span>Experience:</span>
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
        <section aria-labelledby="education" className="flex-basis-1">
          <h2 id="education" className="my-6 text-4xl">
            Education
          </h2>
          <article className="flex items-center justify-between rounded-lg p-2">
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

      <div className="min-w-[400px]">
        <section aria-labelledby="value-proposition">
          <h2 id="value-proposition" className="mb-3 mt-9 text-4xl">
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
            <li>High productivity form my continuous learning and AI power.</li>
          </ul>
        </section>
        <section aria-labelledby="projects">
          <h2 id="projects" className="mb-3 mt-9 text-4xl">
            My Projects
          </h2>
          <ProjectShowcase />
        </section>
      </div>
    </>
  );
};

export default Page;
