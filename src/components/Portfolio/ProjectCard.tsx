import { useTranslations } from 'next-intl';
import { ExternalLink, Code } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  alternateUrl?: string;
  repoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('portfolio');

  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
      {/* Project title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {project.name}
      </h3>

      {/* Project description - grows to fill available space */}
      <p className="mt-2 flex-grow text-base text-gray-600 dark:text-gray-300">
        {project.description}
      </p>

      {/* Tech stack badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-block rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-transform hover:scale-105 dark:bg-gray-700 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action buttons - anchored to bottom with mt-auto */}
      {(project.demoUrl || project.alternateUrl || project.repoUrl) && (
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {/* Primary demo URL */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
              aria-label={`View ${project.name} live demo`}
            >
              <ExternalLink className="h-4 w-4" />
              <span>{t('viewProject')}</span>
            </a>
          )}

          {/* Alternate demo URL (for Agoda, Rocket Travel per D-04, D-05) */}
          {project.alternateUrl && (
            <a
              href={project.alternateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
              aria-label={`View ${project.name} alternate demo`}
            >
              <ExternalLink className="h-4 w-4" />
              <span>{t('viewProject')}</span>
            </a>
          )}

          {/* GitHub repository URL */}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-600 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-900"
              aria-label={`View ${project.name} source code on GitHub`}
            >
              <Code className="h-4 w-4" />
              <span>{t('viewCode')}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
