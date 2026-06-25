'use client'

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

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    image: '🛍️',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    live: '#',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team features, and analytics.',
    image: '📋',
    technologies: ['Next.js', 'PostgreSQL', 'WebSockets', 'Redis'],
    github: '#',
    live: '#',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization and custom reporting capabilities.',
    image: '📊',
    technologies: ['React', 'TypeScript', 'D3.js', 'AWS'],
    github: '#',
    live: '#',
  },
  {
    title: 'Social Media Feed',
    description: 'High-performance social media feed with infinite scroll, media uploads, and real-time notifications.',
    image: '📱',
    technologies: ['React', 'GraphQL', 'PostgreSQL', 'Redis'],
    github: '#',
    live: '#',
  },
  {
    title: 'AI Chat Application',
    description: 'AI-powered chat application with multiple conversation threads and export capabilities.',
    image: '🤖',
    technologies: ['Next.js', 'OpenAI', 'Vercel AI', 'Supabase'],
    github: '#',
    live: '#',
  },
  {
    title: 'DevOps Dashboard',
    description: 'Comprehensive DevOps monitoring dashboard for CI/CD pipelines and infrastructure management.',
    image: '⚙️',
    technologies: ['React', 'Node.js', 'Docker', 'Kubernetes'],
    github: '#',
    live: '#',
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded bg-primary/10 text-xs text-primary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-primary/20 text-sm font-medium hover:bg-primary/10 transition-colors"
                    >
                      <Code2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="hidden sm:inline">Live</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
