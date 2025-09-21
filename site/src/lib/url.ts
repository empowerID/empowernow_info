export const slugify = (s: string): string => s
	.toLowerCase()
	.replace(/[^a-z0-9\s-]/g, '')
	.trim()
	.replace(/\s+/g, '-')
	.replace(/-+/g, '-');

export const canonicalPath = (section: string, slug: string): string => `/${section}/${slug}/`;
