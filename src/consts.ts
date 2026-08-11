// These used to be hardcoded here. They now come from src/data/site.json so
// they can be edited in the CMS under Settings → Site & contact.
//
// The named exports are kept so components import from one predictable place;
// changing a value means editing the JSON (or the CMS), not this file.

import { site } from './lib/site';

export const SITE_TITLE = site.title;
export const SITE_DESCRIPTION = site.description;

/** Sits under the name in the header and footer. */
export const SITE_ROLE = site.role;

/** The reel at the top of the homepage. */
export const SHOWREEL = site.showreelUrl;
export const SHOWREEL_LABEL = site.showreelLabel;

/** Used by the footer and the about page, so they can never drift apart. */
export const LINKS = {
	linkedin: site.linkedin,
	vimeo: site.vimeo,
	email: site.email,
};
