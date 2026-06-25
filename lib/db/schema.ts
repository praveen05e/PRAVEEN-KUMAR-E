import { pgTable, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core'

// ─── Better-Auth: user ──────────────────────────────────────
export const user = pgTable('user', {
  id:            text('id').primaryKey(),
  name:          text('name').notNull(),
  email:         text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image:         text('image'),
  role:          text('role').notNull().default('admin'),
  createdAt:     timestamp('createdAt').notNull(),
  updatedAt:     timestamp('updatedAt').notNull(),
})

// ─── Better-Auth: session ────────────────────────────────────
export const session = pgTable('session', {
  id:        text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token:     text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId:    text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
})

// ─── Better-Auth: account ────────────────────────────────────
export const account = pgTable('account', {
  id:                    text('id').primaryKey(),
  accountId:             text('accountId').notNull(),
  providerId:            text('providerId').notNull(),
  userId:                text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken:           text('accessToken'),
  refreshToken:          text('refreshToken'),
  idToken:               text('idToken'),
  accessTokenExpiresAt:  timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope:                 text('scope'),
  password:              text('password'),
  createdAt:             timestamp('createdAt').notNull(),
  updatedAt:             timestamp('updatedAt').notNull(),
})

// ─── Better-Auth: verification ───────────────────────────────
export const verification = pgTable('verification', {
  id:         text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value:      text('value').notNull(),
  expiresAt:  timestamp('expiresAt').notNull(),
  createdAt:  timestamp('createdAt'),
  updatedAt:  timestamp('updatedAt'),
})

// ─── Portfolio: projects ─────────────────────────────────────
export const projects = pgTable('projects', {
  id:              text('id').primaryKey(),
  title:           text('title').notNull(),
  description:     text('description').notNull(),
  longDescription: text('longDescription'),
  image:           text('image').notNull(),
  technologies:    text('technologies').notNull(), // comma-separated strings or JSON-serialized text
  githubUrl:       text('githubUrl'),
  liveUrl:         text('liveUrl'),
  featured:        boolean('featured').notNull().default(false),
  order:           integer('order').notNull().default(0),
  createdAt:       timestamp('createdAt').notNull(),
  updatedAt:       timestamp('updatedAt').notNull(),
})

// ─── Portfolio: experiences ───────────────────────────────────
export const experiences = pgTable('experiences', {
  id:          text('id').primaryKey(),
  company:     text('company').notNull(),
  position:    text('position').notNull(),
  description: text('description').notNull(),
  duration:    text('duration').notNull(),
  startDate:   timestamp('startDate').notNull(),
  endDate:     timestamp('endDate'),
  location:    text('location'),
  order:       integer('order').notNull().default(0),
  createdAt:   timestamp('createdAt').notNull(),
  updatedAt:   timestamp('updatedAt').notNull(),
})

// ─── Portfolio: achievements ──────────────────────────────────
export const achievements = pgTable('achievements', {
  id:          text('id').primaryKey(),
  title:       text('title').notNull(),
  description: text('description').notNull(),
  icon:        text('icon'),
  date:        timestamp('date').notNull(),
  order:       integer('order').notNull().default(0),
  createdAt:   timestamp('createdAt').notNull(),
  updatedAt:   timestamp('updatedAt').notNull(),
})

// ─── Portfolio: certificates ──────────────────────────────────
export const certificates = pgTable('certificates', {
  id:            text('id').primaryKey(),
  title:         text('title').notNull(),
  issuer:        text('issuer').notNull(),
  date:          timestamp('date').notNull(),
  credentialUrl: text('credentialUrl'),
  image:         text('image'),
  order:         integer('order').notNull().default(0),
  createdAt:     timestamp('createdAt').notNull(),
  updatedAt:     timestamp('updatedAt').notNull(),
})

// ─── Portfolio: skills ────────────────────────────────────────
export const skills = pgTable('skills', {
  id:          text('id').primaryKey(),
  name:        text('name').notNull(),
  category:    text('category').notNull(),
  proficiency: integer('proficiency').notNull().default(80),
  order:       integer('order').notNull().default(0),
  createdAt:   timestamp('createdAt').notNull(),
  updatedAt:   timestamp('updatedAt').notNull(),
})

// ─── Portfolio: messages ──────────────────────────────────────
export const messages = pgTable('messages', {
  id:        text('id').primaryKey(),
  name:      text('name').notNull(),
  email:     text('email').notNull(),
  subject:   text('subject').notNull(),
  message:   text('message').notNull(),
  read:      boolean('read').notNull().default(false),
  createdAt: timestamp('createdAt').notNull(),
})

// ─── Portfolio: analytics ─────────────────────────────────────
export const analytics = pgTable('analytics', {
  id:        text('id').primaryKey(),
  pageView:  text('pageView').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  userAgent: text('userAgent'),
  ipAddress: text('ipAddress'),
})

// ─── Portfolio: blog_posts ────────────────────────────────────
export const blogPosts = pgTable('blog_posts', {
  id:          text('id').primaryKey(),
  title:       text('title').notNull(),
  slug:        text('slug').notNull().unique(),
  description: text('description').notNull(),
  content:     text('content').notNull(),
  image:       text('image'),
  published:   boolean('published').notNull().default(false),
  publishedAt: timestamp('publishedAt'),
  createdAt:   timestamp('createdAt').notNull(),
  updatedAt:   timestamp('updatedAt').notNull(),
})

// ─── Portfolio: settings ──────────────────────────────────────
export const settings = pgTable('settings', {
  id:        text('id').primaryKey(),
  key:       text('key').notNull().unique(),
  value:     text('value').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})
