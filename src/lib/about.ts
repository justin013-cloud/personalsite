import { z } from 'astro/zod';
import data from '../data/about.json';

/**
 * The About page content, edited through the CMS.
 *
 * The schema exists so a malformed about.json fails the build with a readable
 * message instead of publishing a page with holes in it — the same guarantee
 * the work collection gets from its own schema.
 */
const schema = z.object({
	metaDescription: z.string().min(1),

	pageEyebrow: z.string().min(1),
	pageTitle: z.string().min(1),

	profileLead: z.string().min(1),
	profileBody: z.string().min(1),

	historyHeading: z.string().min(1),
	awardsHeading: z.string().min(1),
	skillsHeading: z.string().min(1),
	educationHeading: z.string().min(1),
	contactHeading: z.string().min(1),

	jobs: z.array(
		z.object({
			role: z.string().min(1),
			company: z.string().min(1),
			/** Optional aside, e.g. "Acquired by NEC Corporation". */
			note: z.string().optional().default(''),
			/** Free text on purpose — "2024 – 2026", "2019 – Present". No date picker. */
			period: z.string().min(1),
			points: z.array(z.string().min(1)),
		}),
	),

	awards: z.array(
		z.object({
			honor: z.string().min(1),
			body: z.string().min(1),
			year: z.string().min(1),
			work: z.string().optional().default(''),
		}),
	),

	competencies: z.array(z.string().min(1)),
	tools: z.array(z.string().min(1)),

	education: z.object({
		degree: z.string().min(1),
		school: z.string().min(1),
		location: z.string().optional().default(''),
	}),

	contactPitch: z.string().min(1),
});

const parsed = schema.safeParse(data);

if (!parsed.success) {
	const issues = parsed.error.issues
		.map((issue) => `  • ${issue.path.join('.') || '(root)'}: ${issue.message}`)
		.join('\n');
	throw new Error(`src/data/about.json is not valid:\n${issues}`);
}

export const about = parsed.data;
export type About = typeof about;
