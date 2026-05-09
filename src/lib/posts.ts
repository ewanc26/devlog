import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

export interface PostMeta {
	slug: string;
	path: string;
	title: string;
	description: string;
	date: string;
	time: string;
	tags: string[];
	draft: boolean;
}

export interface Post extends PostMeta {
	content: string;
}

const POSTS_DIR = resolve('src/content/devlog');

/** Parse a date field (YYYY-MM-DD or full ISO 8601) into a YYYY-MM-DD string. */
function toISODate(raw: unknown): string {
	if (!raw) return '';
	if (raw instanceof Date) return raw.toISOString().slice(0, 10);
	return String(raw).slice(0, 10);
}

/**
 * Extract a time string (HH:MM or HH:MM:SS) from frontmatter.
 * Supports a standalone `time` field, or extracts time from a full ISO 8601
 * `date` field (e.g. `2026-05-08T16:00:00Z` → `16:00`).
 */
function toTime(rawDate: unknown, rawTime?: unknown): string {
	// Standalone time field takes priority
	if (rawTime) {
		const s = String(rawTime).trim();
		if (/^\d{2}:\d{2}(:\d{2})?$/.test(s)) return s;
	}

	// Extract time from full ISO 8601 date
	if (rawDate) {
		const s = String(rawDate).trim();
		const match = s.match(/T(\d{2}:\d{2})(?::(\d{2}))?/);
		if (match) return match[2] ? `${match[1]}:${match[2]}` : match[1];
	}

	return '';
}

/** Strip the YYYY-MM-DD- prefix from a filename slug. */
function stripDatePrefix(slug: string): string {
	return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/** Build a URL path like 2024/03/02/mastodon-markov-bot from a slug + date. */
function buildPath(slug: string, date: string): string {
	const name = stripDatePrefix(slug);
	const [year, month, day] = date.split('-');
	return `${year}/${month}/${day}/${name}`;
}

function slugFrom(filename: string) {
	return filename.replace(/\.mdx?$/, '');
}

/** Composite sort key: date + time (padded) + slug for stable ordering. */
function sortKey(post: PostMeta): string {
	const time = post.time || '99:99'; // entries without time sort after timed ones
	return `${post.date}T${time}-${post.slug}`;
}

export function listPosts(): PostMeta[] {
	return readdirSync(POSTS_DIR)
		.filter((f) => /\.mdx?$/.test(f))
		.map((filename) => {
			const raw = readFileSync(`${POSTS_DIR}/${filename}`, 'utf-8');
			const { data } = matter(raw);
			const slug = slugFrom(filename);
			const date = toISODate(data.date);
			return {
				slug,
				path: buildPath(slug, date),
				title: data.title ?? slug,
				description: data.description ?? '',
				date,
				time: toTime(data.date, data.time),
				tags: data.tags ?? [],
				draft: data.draft ?? false
			};
		})
		.filter((p) => !p.draft)
		.sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}

export function getPost(slug: string): Post {
	const raw = readFileSync(`${POSTS_DIR}/${slug}.md`, 'utf-8');
	const { data, content } = matter(raw);
	const date = toISODate(data.date);
	return {
		slug,
		path: buildPath(slug, date),
		title: data.title ?? slug,
		description: data.description ?? '',
		date,
		time: toTime(data.date, data.time),
		tags: data.tags ?? [],
		draft: data.draft ?? false,
		content
	};
}
