"use client"

import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

export function ProjectsClient({ projectsData }: { projectsData: any[] }) {
  if (projectsData.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Projects coming soon. Check back later!</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <span className="text-sm text-primary font-medium">Featured Work</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
          Projects I&apos;m Proud Of
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors"
          >
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(() => {
                  let techArray: string[] = [];
                  if (Array.isArray(project.technologies)) {
                    techArray = project.technologies;
                  } else if (typeof project.technologies === 'string') {
                    try {
                      techArray = JSON.parse(project.technologies);
                    } catch {
                      techArray = project.technologies.split(',').map(t => t.trim()).filter(Boolean);
                    }
                  }
                  return techArray.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-primary/10 text-xs text-primary font-medium"
                    >
                      {tech}
                    </span>
                  ));
                })()}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-primary/20 text-sm font-medium hover:bg-primary/10 transition-colors"
                  >
                    <Code2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">Live</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
