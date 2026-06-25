'use client'

import { motion } from 'framer-motion'
import { Cpu, Network, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function About() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      {/* Decorative Ambient Lighting */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 md:mb-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-bold uppercase tracking-widest">About Me</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Engineering intelligence into modern web experiences.
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full" />
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column - Upgraded Biography */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I am a Data Science engineer and Full-Stack Developer driven by the challenge of turning complex logic into seamless digital experiences. Currently completing my B.Tech in AI & Data Science at Kings Engineering College, I focus on bridging the gap between predictive machine learning algorithms and highly scalable, user-facing web applications.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Operating as an independent developer, I architect and deploy production-grade platforms—ranging from custom CMS infrastructures to data-intensive enterprise solutions. Leading my team to secure first place in the Smart India Hackathon (SIH) 2025 internal qualifiers reinforced my commitment to building technology that doesn't just function, but actively solves real-world problems with measurable impact.
              </p>
              
              {/* Specialized Skill Focus */}
              <div className="pt-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Core Competencies</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'AI & Machine Learning Architecture',
                    'Scalable Full-Stack Development',
                    'Data Science & Predictive Analytics',
                    'Cloud & Database Infrastructure',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm font-medium text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-sm bg-primary/80" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Engineering Philosophy */}
            <motion.div variants={itemVariants} className="lg:col-span-5 relative">
              <div className="group relative p-8 sm:p-10 rounded-3xl bg-card/40 border border-border/50 backdrop-blur-md shadow-2xl shadow-black/5 overflow-hidden transition-all duration-500 hover:bg-card/60 hover:border-primary/30">
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Engineering Philosophy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I approach software development as a holistic discipline. Great products live at the intersection of robust data architecture and frictionless user design.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Philosophy Item 1 */}
                    <div className="flex gap-4">
                      <div className="mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-1">Performance First</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">Optimizing database queries and system architecture for maximum speed and reliability.</p>
                      </div>
                    </div>

                    {/* Philosophy Item 2 */}
                    <div className="flex gap-4">
                      <div className="mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Network className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-1">Data-Driven Systems</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">Leveraging AI and analytics to create systems that adapt, predict, and scale intelligently.</p>
                      </div>
                    </div>

                    {/* Philosophy Item 3 */}
                    <div className="flex gap-4">
                      <div className="mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-1">Production Ready</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">Writing clean, maintainable code designed to handle real-world edge cases and enterprise traffic.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}