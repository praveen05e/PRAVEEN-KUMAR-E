import { getProjects } from '@/app/actions/portfolio'
import { ProjectsClient } from './projects-client'

export async function ProjectsDynamic() {
  const projectsData = await getProjects()

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsClient projectsData={projectsData} />
      </div>
    </section>
  )
}
