import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One Markdown file per project, in src/content/work/.
 *
 * Every field is flat and simple on purpose: it keeps adding a project to
 * "edit one file", and it maps cleanly onto a CMS field when we add one.
 */

// Accepts the URL shapes you actually get by copying from Vimeo.
const VIMEO_URL = /^https?:\/\/(?:www\.)?vimeo\.com\/(?:video\/)?\d+/;

const work = defineCollection({
	loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			/** Shown on the card and as the page headline. */
			title: z.string(),

			/** Paste the full Vimeo URL. The ID is pulled out of it in src/lib/vimeo.ts. */
			vimeo: z
				.string()
				.regex(VIMEO_URL, 'Paste the whole Vimeo URL, like https://vimeo.com/816579985'),

			/** Drives the aspect ratio and how the row is laid out. */
			orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),

			/** Who it was made for, and the role you held at the time. */
			client: z.string().optional(),
			role: z.string().optional(),

			/** Release date. Sorts the work list, newest first. */
			date: z.coerce.date(),

			/** One or two sentences. Shown on the card and above the video. */
			brief: z.string(),

			/** Optional, e.g. "Gold Winner · Aster Awards 2024". */
			award: z.string().optional(),

			/** Optional custom poster frame. Falls back to Vimeo's thumbnail. */
			poster: z.optional(image()),

			/** Featured projects appear on the homepage. */
			featured: z.boolean().default(false),

			/** Lower numbers sort first, ahead of the date. */
			order: z.number().default(999),

			/** Drafts are hidden from the built site. */
			draft: z.boolean().default(false),
		}),
});

export const collections = { work };
