import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES, PROJECT_TYPES, TITLE_FONTS, PRESET_KEYS } from './lib/types';
import { missingPublishedFields } from './lib/schema-rules';

// Test-only projects live in src/content/fixtures and are loaded only when PORTFOLIO_FIXTURES=1.
const withFixtures = process.env.PORTFOLIO_FIXTURES === '1';
const idFromFileName = ({ entry }: { entry: string }) => entry.split('/').pop()!.replace(/\.md$/, '');
const urlOrLocalPath = z.union([z.url(), z.string().regex(/^\//, 'must be a URL or a path starting with /')]);

const projects = defineCollection({
  loader: glob({
    pattern: withFixtures ? ['projects/**/*.md', 'fixtures/**/*.md'] : ['projects/**/*.md'],
    base: './src/content',
    generateId: idFromFileName,
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        category: z.enum(CATEGORIES),
        summary: z.string().optional(),
        type: z.enum(PROJECT_TYPES).optional(),
        role: z.string().optional(),
        client: z.string().optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        features: z.array(z.string()).default([]),
        logo: image().optional(),
        accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'use a 6-digit hex colour like #ff3b5c').optional(),
        titleFont: z.enum(TITLE_FONTS).optional(),
        cover: image().optional(),
        gallery: z.array(image()).default([]),
        video: urlOrLocalPath.optional(),
        previewClip: z.string().regex(/^\//, 'must be a path starting with /').optional(),
        playEmbed: urlOrLocalPath.optional(),
        links: z
          .object({ live: z.url().optional(), github: z.url().optional(), itch: z.url().optional(), store: z.url().optional() })
          .default({}),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
      .superRefine((data, ctx) => {
        for (const field of missingPublishedFields(data)) {
          ctx.addIssue({ code: 'custom', path: [field], message: `"${field}" is required once draft is false` });
        }
      }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    highlights: z.array(z.string()).default([]),
    hideOn: z.array(z.enum(PRESET_KEYS)).default([]),
  }),
});

export const collections = { projects, experience };
