-- ============================================================
--  Praveen's Portfolio — InfinityFree MySQL Database Schema
--  Run this in InfinityFree phpMyAdmin on your database
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

-- ─── Better-Auth: user ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS `user` (
  `id`            VARCHAR(255)  NOT NULL,
  `name`          VARCHAR(255)  NOT NULL,
  `email`         VARCHAR(255)  NOT NULL,
  `emailVerified` TINYINT(1)    NOT NULL DEFAULT 0,
  `image`         TEXT          DEFAULT NULL,
  `createdAt`     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Better-Auth: session ───────────────────────────────────
CREATE TABLE IF NOT EXISTS `session` (
  `id`         VARCHAR(255)  NOT NULL,
  `expiresAt`  DATETIME      NOT NULL,
  `token`      VARCHAR(500)  NOT NULL,
  `createdAt`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ipAddress`  VARCHAR(255)  DEFAULT NULL,
  `userAgent`  TEXT          DEFAULT NULL,
  `userId`     VARCHAR(255)  NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token_unique` (`token`),
  KEY `session_userId_idx` (`userId`),
  CONSTRAINT `session_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Better-Auth: account ───────────────────────────────────
CREATE TABLE IF NOT EXISTS `account` (
  `id`                     VARCHAR(255)  NOT NULL,
  `accountId`              VARCHAR(255)  NOT NULL,
  `providerId`             VARCHAR(255)  NOT NULL,
  `userId`                 VARCHAR(255)  NOT NULL,
  `accessToken`            TEXT          DEFAULT NULL,
  `refreshToken`           TEXT          DEFAULT NULL,
  `idToken`                TEXT          DEFAULT NULL,
  `accessTokenExpiresAt`   DATETIME      DEFAULT NULL,
  `refreshTokenExpiresAt`  DATETIME      DEFAULT NULL,
  `scope`                  VARCHAR(500)  DEFAULT NULL,
  `password`               TEXT          DEFAULT NULL,
  `createdAt`              DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`              DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `account_userId_idx` (`userId`),
  CONSTRAINT `account_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Better-Auth: verification ──────────────────────────────
CREATE TABLE IF NOT EXISTS `verification` (
  `id`          VARCHAR(255)  NOT NULL,
  `identifier`  VARCHAR(255)  NOT NULL,
  `value`       TEXT          NOT NULL,
  `expiresAt`   DATETIME      NOT NULL,
  `createdAt`   DATETIME      DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`   DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: projects ────────────────────────────────────
CREATE TABLE IF NOT EXISTS `projects` (
  `id`               VARCHAR(255)  NOT NULL,
  `title`            VARCHAR(255)  NOT NULL,
  `description`      TEXT          NOT NULL,
  `longDescription`  LONGTEXT      DEFAULT NULL,
  `image`            VARCHAR(500)  NOT NULL,
  `technologies`     TEXT          NOT NULL,   -- stored as JSON string
  `githubUrl`        VARCHAR(500)  DEFAULT NULL,
  `liveUrl`          VARCHAR(500)  DEFAULT NULL,
  `featured`         TINYINT(1)    NOT NULL DEFAULT 0,
  `order`            INT           NOT NULL DEFAULT 0,
  `createdAt`        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: experiences ─────────────────────────────────
CREATE TABLE IF NOT EXISTS `experiences` (
  `id`          VARCHAR(255)  NOT NULL,
  `company`     VARCHAR(255)  NOT NULL,
  `position`    VARCHAR(255)  NOT NULL,
  `description` TEXT          NOT NULL,
  `duration`    VARCHAR(255)  NOT NULL,
  `startDate`   DATETIME      NOT NULL,
  `endDate`     DATETIME      DEFAULT NULL,
  `location`    VARCHAR(255)  DEFAULT NULL,
  `order`       INT           NOT NULL DEFAULT 0,
  `createdAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: achievements ────────────────────────────────
CREATE TABLE IF NOT EXISTS `achievements` (
  `id`          VARCHAR(255)  NOT NULL,
  `title`       VARCHAR(255)  NOT NULL,
  `description` TEXT          NOT NULL,
  `icon`        VARCHAR(255)  DEFAULT NULL,
  `date`        DATETIME      NOT NULL,
  `order`       INT           NOT NULL DEFAULT 0,
  `createdAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: certificates ────────────────────────────────
CREATE TABLE IF NOT EXISTS `certificates` (
  `id`            VARCHAR(255)  NOT NULL,
  `title`         VARCHAR(255)  NOT NULL,
  `issuer`        VARCHAR(255)  NOT NULL,
  `date`          DATETIME      NOT NULL,
  `credentialUrl` VARCHAR(500)  DEFAULT NULL,
  `image`         VARCHAR(500)  DEFAULT NULL,
  `order`         INT           NOT NULL DEFAULT 0,
  `createdAt`     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: skills ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS `skills` (
  `id`          VARCHAR(255)  NOT NULL,
  `name`        VARCHAR(255)  NOT NULL,
  `category`    VARCHAR(255)  NOT NULL,
  `proficiency` INT           NOT NULL DEFAULT 80,
  `order`       INT           NOT NULL DEFAULT 0,
  `createdAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: messages ────────────────────────────────────
CREATE TABLE IF NOT EXISTS `messages` (
  `id`        VARCHAR(255)  NOT NULL,
  `name`      VARCHAR(255)  NOT NULL,
  `email`     VARCHAR(255)  NOT NULL,
  `subject`   VARCHAR(500)  NOT NULL,
  `message`   TEXT          NOT NULL,
  `read`      TINYINT(1)    NOT NULL DEFAULT 0,
  `createdAt` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: analytics ───────────────────────────────────
CREATE TABLE IF NOT EXISTS `analytics` (
  `id`        VARCHAR(255)  NOT NULL,
  `pageView`  VARCHAR(500)  NOT NULL,
  `timestamp` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userAgent` TEXT          DEFAULT NULL,
  `ipAddress` VARCHAR(255)  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: blog_posts ──────────────────────────────────
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id`          VARCHAR(255)  NOT NULL,
  `title`       VARCHAR(500)  NOT NULL,
  `slug`        VARCHAR(500)  NOT NULL,
  `description` TEXT          NOT NULL,
  `content`     LONGTEXT      NOT NULL,
  `image`       VARCHAR(500)  DEFAULT NULL,
  `published`   TINYINT(1)    NOT NULL DEFAULT 0,
  `publishedAt` DATETIME      DEFAULT NULL,
  `createdAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_posts_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Portfolio: settings ────────────────────────────────────
CREATE TABLE IF NOT EXISTS `settings` (
  `id`        VARCHAR(255)  NOT NULL,
  `key`       VARCHAR(255)  NOT NULL,
  `value`     TEXT          NOT NULL,
  `updatedAt` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
-- ============================================================
--  Done! All tables created successfully.
-- ============================================================
