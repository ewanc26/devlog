import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

export interface PostMeta {
	slug: string;
	path: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	draft: boolean;
}

export interface Post extends PostMeta {
	content: string;
}

const POSTS_DIR = resolve('src/content/devlog');

function toISODate(raw: unknown): string {
	if (!raw) return '';
	if (raw instanceof Date) return raw.toISOString().slice(0, 10);
	return String(raw).slice(0, 10);
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
				tags: data.tags ?? [],
				draft: data.draft ?? false
			};
		})
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
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
		tags: data.tags ?? [],
		draft: data.draft ?? false,
		content
	};
}
