/**
 * Vimeo helpers.
 *
 * Content files store the full Vimeo URL rather than a bare ID, because that is
 * what you get when you copy from the browser address bar. Everything that needs
 * an ID derives it here.
 */

/** Matches the numeric ID in any normal Vimeo URL shape. */
const VIMEO_URL = /vimeo\.com\/(?:video\/)?(\d+)/;

export function vimeoId(url: string): string {
	const match = url.match(VIMEO_URL);
	if (!match) {
		// The collection schema should have caught this long before here.
		throw new Error(`Could not find a video ID in the Vimeo URL: ${url}`);
	}
	return match[1];
}

/** Player URL. Only ever loaded after someone clicks play. */
export function vimeoEmbedUrl(url: string): string {
	const params = new URLSearchParams({
		autoplay: '1',
		title: '0',
		byline: '0',
		portrait: '0',
		dnt: '1', // ask Vimeo not to track the viewer
	});
	return `https://player.vimeo.com/video/${vimeoId(url)}?${params}`;
}

/**
 * Poster frame from Vimeo's public oEmbed endpoint, fetched at build time.
 *
 * Returns null rather than throwing if Vimeo is unreachable or the video is
 * restricted — a missing poster degrades to a plain title card, which is a much
 * better failure than a broken deploy. Results are memoised so a video used on
 * both the homepage and its own page is only fetched once per build.
 */
const posterCache = new Map<string, string | null>();

export async function vimeoPoster(url: string): Promise<string | null> {
	const id = vimeoId(url);
	const cached = posterCache.get(id);
	if (cached !== undefined) return cached;

	let poster: string | null = null;
	try {
		const endpoint = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${id}&width=1280`;
		const response = await fetch(endpoint);
		if (response.ok) {
			const data = (await response.json()) as { thumbnail_url?: string };
			poster = data.thumbnail_url ?? null;
		}
	} catch {
		// Network failure during build. Fall through to null.
	}

	posterCache.set(id, poster);
	return poster;
}
