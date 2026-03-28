import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  alternateUrl?: string;
  repoUrl?: string;
}

export default function ProjectGrid() {
  const t = useTranslations('portfolio');
  const projects = t.raw('projects') as Project[];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={`${project.name}-${index}`}
          project={project}
        />
      ))}
    </div>
  );
}
