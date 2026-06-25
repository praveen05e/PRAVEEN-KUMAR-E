# Professional Portfolio Website

A modern, full-stack portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. Features a beautiful public-facing portfolio site with an admin dashboard for content management.

## Features

### Public Portfolio Site
- **Hero Section** - Animated introduction with call-to-action buttons
- **About Section** - Professional background and key stats
- **Projects Showcase** - Dynamic project cards with technology tags and links
- **Experience Timeline** - Chronological work history with descriptions
- **Skills Section** - Technical skills organized by category with proficiency levels
- **Contact Form** - Functional contact form with email validation
- **Responsive Design** - Mobile-first responsive layout
- **Smooth Animations** - Professional animations using Framer Motion

### Admin Dashboard
- **Secure Authentication** - Email/password authentication with Better Auth
- **Project Management** - Create, read, update, delete projects
- **Experience Management** - Manage work history and positions
- **Skills Management** - Organize and rate technical skills
- **Message Inbox** - View and manage contact form submissions
- **Settings** - Configure portfolio information
- **Responsive Admin UI** - Mobile-friendly admin dashboard

## Tech Stack

- **Frontend**
  - Next.js 16 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS 4
  - Framer Motion (animations)
  - Lucide React (icons)

- **Backend**
  - Next.js Server Actions
  - Better Auth (authentication)
  - Drizzle ORM (database)
  - Neon PostgreSQL (database)

- **Deployment**
  - Vercel (recommended)
  - Environment variables for secrets

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Neon PostgreSQL database

### Installation

1. **Clone or download the project**
```bash
cd portfolio-website
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file with:
```env
DATABASE_URL=postgresql://your-neon-database-url
BETTER_AUTH_SECRET=<generate-with-openssl-rand-base64-32>
BETTER_AUTH_URL=http://localhost:3000
```

To generate `BETTER_AUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. **Initialize the database**
The database tables are pre-created in Neon. To verify the connection:
```bash
pnpm db:push
```

5. **Create admin user**
Sign up through `/admin/login` page to create your admin account.

6. **Run development server**
```bash
pnpm dev
```

Visit http://localhost:3000 to view the portfolio.

## Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── api/
│   │   ├── auth/[...all]/        # Better Auth routes
│   │   └── contact/              # Contact form API
│   ├── actions/
│   │   ├── portfolio.ts          # Public portfolio actions
│   │   └── admin.ts              # Admin CRUD actions
│   └── admin/
│       ├── layout.tsx            # Admin layout (protected)
│       ├── login/                # Admin login page
│       └── dashboard/            # Admin dashboard
├── components/
│   ├── hero.tsx                  # Hero section
│   ├── about.tsx                 # About section
│   ├── projects.tsx              # Projects section
│   ├── experience.tsx            # Experience section
│   ├── skills.tsx                # Skills section
│   ├── contact.tsx               # Contact section
│   ├── contact-form.tsx          # Contact form component
│   ├── projects-dynamic.tsx      # Dynamic projects (from DB)
│   ├── navbar.tsx                # Navigation bar
│   └── footer.tsx                # Footer
├── lib/
│   ├── auth.ts                   # Better Auth configuration
│   ├── auth-client.ts            # Auth client for frontend
│   └── db/
│       ├── index.ts              # Drizzle client
│       └── schema.ts             # Database schema
├── prisma/
│   └── schema.prisma             # Alternative schema reference
└── public/                        # Static assets
```

## Database Schema

The portfolio uses 9 main tables:

1. **users** - Admin users (Better Auth)
2. **session** - User sessions (Better Auth)
3. **account** - OAuth accounts (Better Auth)
4. **verification** - Email verification (Better Auth)
5. **projects** - Portfolio projects
6. **experiences** - Work experience history
7. **skills** - Technical skills by category
8. **achievements** - Awards and accomplishments
9. **certificates** - Certifications and credentials
10. **messages** - Contact form submissions
11. **analytics** - Page view tracking

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Set environment variables:
  - `DATABASE_URL` - Your Neon PostgreSQL connection string
  - `BETTER_AUTH_SECRET` - Generate with `openssl rand -base64 32`
  - `BETTER_AUTH_URL` - Your Vercel deployment URL

3. **Deploy**
- Click "Deploy"
- Vercel will build and deploy automatically

### Alternative: Deploy Elsewhere

The app can be deployed to any Node.js hosting:
- Railway
- Render
- DigitalOcean
- AWS (EC2, Lambda, etc.)

Ensure environment variables are set correctly for your hosting provider.

## Usage

### Public Portfolio
- Visit the home page to view your portfolio
- Fill out the contact form to send messages
- All sections are automatically populated from the database

### Admin Dashboard
- Navigate to `/admin/login`
- Sign in with your admin credentials
- Manage projects, experience, skills, and messages
- Edit settings to customize your portfolio

## Performance Optimization

- **Images** - Optimized with Next.js Image component
- **CSS** - Tailwind CSS with tree-shaking
- **JavaScript** - Code splitting and lazy loading
- **Caching** - Server-side caching with Drizzle
- **SEO** - Optimized metadata and Open Graph tags

## Security

- **Authentication** - Secure JWT sessions with Better Auth
- **HTTPS** - Enforced on Vercel
- **Environment Variables** - Secrets managed securely
- **SQL Injection** - Prevented with Drizzle parameterized queries
- **CORS** - Configured for cross-origin requests

## Customization

### Update Portfolio Information
1. Sign in to admin dashboard
2. Go to Settings
3. Update your portfolio title and bio
4. Save changes

### Add Projects
1. In admin dashboard, go to Projects
2. Click "Add Project"
3. Fill in project details:
   - Title
   - Description
   - Technologies
   - GitHub and Live URLs
4. Save to publish

### Manage Experience
1. In admin dashboard, go to Experience
2. Add new job entries with:
   - Company name
   - Position
   - Duration
   - Description
   - Location

### Update Skills
1. In admin dashboard, go to Skills
2. Add skills by category (Frontend, Backend, DevOps, etc.)
3. Set proficiency level (1-100)
4. Organize with drag-and-drop

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check Neon database status
- Ensure IP whitelist allows your connection

### Authentication Not Working
- Verify `BETTER_AUTH_SECRET` is set
- Check `BETTER_AUTH_URL` matches your domain
- Clear browser cookies and try again

### Build Errors
- Delete `node_modules` and `.next`
- Run `pnpm install` again
- Check for TypeScript errors: `pnpm type-check`

## Support

For issues and feature requests:
1. Check the GitHub repository
2. Review the documentation
3. Contact support through the portfolio contact form

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Credits

Built with:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Better Auth
- Drizzle ORM
- Neon PostgreSQL

---

**Made with ❤️ for developers who want to showcase their work**
