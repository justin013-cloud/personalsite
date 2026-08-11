import { z } from 'astro/zod';
import data from '../data/site.json';

/**
 * Site-wide values, edited in the CMS under Settings → Site & contact.
 *
 * The URL and email checks matter more here than anywhere else on the site:
 * a typo in a contact link on a portfolio is a lost job, and it's the kind of
 * mistake nobody notices for months. Failing the build is the cheaper outcome.
 */
const schema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	role: z.string().min(1),

	showreelUrl: z.string().url().regex(/vimeo\.com/, 'Must be a Vimeo URL'),
	showreelLabel: z.string().min(1),

	email: z.string().email(),
	linkedin: z.string().url(),
	vimeo: z.string().url(),
});

const parsed = schema.safeParse(data);

if (!parsed.success) {
	const issues = parsed.error.issues
		.map((issue) => `  • ${issue.path.join('.') || '(root)'}: ${issue.message}`)
		.join('\n');
	throw new Error(`src/data/site.json is not valid:\n${issues}`);
}

export const site = parsed.data;
