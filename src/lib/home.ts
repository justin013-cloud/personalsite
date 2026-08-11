import { z } from 'astro/zod';
import data from '../data/home.json';

/** Homepage hero copy, edited in the CMS under Pages → Homepage. */
const schema = z.object({
	eyebrow: z.string().min(1),
	headline: z.string().min(1),
	lede: z.string().min(1),
	workHeading: z.string().min(1),
});

const parsed = schema.safeParse(data);

if (!parsed.success) {
	const issues = parsed.error.issues
		.map((issue) => `  • ${issue.path.join('.') || '(root)'}: ${issue.message}`)
		.join('\n');
	throw new Error(`src/data/home.json is not valid:\n${issues}`);
}

export const home = parsed.data;
