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
    <>
      <div className="min-w-[400px]">
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
              <div
                aria-label="Location"
                className="flex items-center gap-2 flex-wrap"
              >
                Location:{' '}
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
        <section aria-labelledby="education" className="w-[80%]">
          <h2 id="education" className="text-4xl my-6">
            Education
          </h2>
          <article className="rounded-lg  flex justify-between p-2 items-center ">
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
        <section aria-labelledby="value-proposition" className="w-[80%]">
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
            <li>High productivity form my continuous learning and AI power.</li>
          </ul>
        </section>
        <section aria-labelledby="projects">
          <h2 id="projects" className="text-4xl mb-3 mt-9">
            My Projects
          </h2>
          <ProjectShowcase />
        </section>
      </div>
    </>
  );
};
