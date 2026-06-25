'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const skillCategories = [
  {
    name: 'Languages & Core',
    skills: [
      { name: 'Python', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'JavaScript', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'PHP', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { name: 'C', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
      { name: 'SQL', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-original.svg' }, // Note: Using generic SQL or Postgres/MySQL later
    ],
  },
  {
    name: 'Frameworks & Web',
    skills: [
      { name: 'HTML/CSS', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'Bootstrap', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
      { name: 'REST APIs', level: 90, icon: null },
      { name: 'Streamlit', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg' },
      { name: 'Plotly', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/plotly/plotly-original.svg' },
    ],
  },
  {
    name: 'AI & Engineering',
    skills: [
      { name: 'OpenAI/Gemini APIs', level: 90, icon: null },
      { name: 'NLP', level: 85, icon: null },
      { name: 'LLM Development', level: 80, icon: null },
      { name: 'Linear Regression', level: 85, icon: null },
    ],
  },
  {
    name: 'Tools & Automation',
    skills: [
      { name: 'n8n', level: 95, icon: null }, // simpleicons or custom needed, but fallback to null
      { name: 'Git', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'Vercel', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
      { name: 'GitHub Copilot', level: 95, icon: null },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm text-primary font-medium">Technical Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6 mx-auto max-w-2xl">
              Skills & Technologies
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Category Title */}
                <div className="text-xl font-bold text-foreground mb-6">{category.name}</div>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: (catIdx * 0.2) + (idx * 0.1) 
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-primary/20 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)] transition-all cursor-default"
                    >
                      {skill.icon ? (
                        <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-primary">{skill.name.charAt(0)}</span>
                        </div>
                      )}
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
