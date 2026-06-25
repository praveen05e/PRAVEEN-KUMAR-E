'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, // Ultra-smooth sleek easing
  },
}

const experiences = [
  {
    company: 'Freelance (Remote)',
    position: 'Full-Stack Developer',
    duration: 'Dec 2024 - Present',
    description: 'Engineering production-grade web platforms and CMS architectures. Deployed 3+ live production systems utilizing PHP and MySQL, consistently achieving 100% on-time delivery metrics.',
    highlights: ['Students Coaching Academy', 'TRXTERINDIA EXIM', 'Le Stylist', 'PHP/MySQL'],
  },
  {
    company: 'Kings Engineering College',
    position: 'B.Tech - AI & Data Science',
    duration: 'Sep 2023 - May 2027',
    description: 'Final-year student specializing in Artificial Intelligence, Data Science, and scalable full-stack software solutions. Maintaining a rigorous focus on practical, production-ready engineering.',
    highlights: ['SIH 2025 Winner', 'AI/ML', 'Data Science'],
  },
  {
    company: 'Hackathons & Symposiums',
    position: 'Key Achievements',
    duration: '2025 - 2026',
    description: 'Secured 1st place in SIH 2025 with an AI-Powered Legal Aid Platform. 1st Place in Debugging (Bioforge 2026) and Runner-Up in Code Treasure Hunt (Sri Sairam).',
    highlights: ['Leadership', 'Problem Solving', 'System Debugging'],
  },
  {
    company: 'CSC Computer Education',
    position: 'Diploma in Computer Application',
    duration: 'Feb 2019 - Aug 2019',
    description: 'Graduated with Grade A. Established foundational knowledge in computer applications, system architecture, and core programming paradigms.',
    highlights: ['Grade: A', 'System Architecture'],
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-20 max-w-2xl">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Career & Education
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Experience & Achievements
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A timeline of my academic journey, professional freelance roles, and competitive programming achievements.
            </p>
          </motion.div>

          {/* Master Timeline Container */}
          <div className="relative">
            {/* The Vertical Axis Line */}
            <div className="absolute left-[11px] md:left-[25%] top-2 bottom-2 w-px bg-border md:-translate-x-1/2" />

            {/* Experience Items List */}
            <div className="flex flex-col gap-12 md:gap-16">
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants} 
                  className="group relative flex flex-col md:flex-row items-start w-full"
                >
                  
                  {/* Left Column (Desktop: Date & Company | Mobile: Hidden) */}
                  <div className="hidden md:flex flex-col w-[25%] pr-10 text-right mt-1">
                    <span className="text-sm font-semibold text-foreground/80 tracking-wide mb-1">
                      {exp.duration}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      {exp.company}
                    </span>
                  </div>

                  {/* The Timeline Dot */}
                  <div className="absolute left-0 md:left-[25%] w-6 h-6 rounded-full bg-background flex items-center justify-center md:-translate-x-1/2 z-10 mt-1 shadow-[0_0_0_4px_hsl(var(--background))]">
                    <div className="w-2.5 h-2.5 rounded-full border-[2px] border-primary bg-background group-hover:bg-primary transition-colors duration-300" />
                  </div>

                  {/* Right Column (Content) */}
                  <div className="w-full md:w-[75%] pl-10 md:pl-12">
                    
                    {/* Mobile Date & Company (Hidden on Desktop) */}
                    <div className="md:hidden flex flex-col mb-3 mt-1">
                      <span className="text-sm font-semibold text-foreground/80 tracking-wide">
                        {exp.duration}
                      </span>
                      <span className="text-sm text-primary font-medium mt-0.5">
                        {exp.company}
                      </span>
                    </div>

                    <div className="relative p-6 -mt-6 -ml-6 rounded-2xl transition-all duration-300 hover:bg-card/40 border border-transparent hover:border-border/50">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
                        {exp.position}
                      </h4>
                      
                      <p className="text-base text-muted-foreground leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium text-secondary-foreground border border-border/50 transition-colors group-hover:border-border"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}