/**
 * Map a tag string to its CSS class for colouring.
 * Scope-based taxonomy: atproto, website, pkgs, bots, esolangs, infra, game, tooling, rust, learning, personal, collab.
 */
export function tagClass(tag: string): string {
	const t = tag.toLowerCase();
	if (t === 'atproto') return 'tag-atproto';
	if (t === 'website') return 'tag-website';
	if (t === 'pkgs') return 'tag-pkgs';
	if (t === 'bots') return 'tag-bots';
	if (t === 'esolangs') return 'tag-esolangs';
	if (t === 'infra') return 'tag-infra';
	if (t === 'game') return 'tag-game';
	if (t === 'tooling') return 'tag-tooling';
	if (t === 'rust') return 'tag-rust';
	if (t === 'learning') return 'tag-learning';
	if (t === 'personal') return 'tag-personal';
	if (t === 'health') return 'tag-personal';
	if (t === 'reflection') return 'tag-personal';
	if (t === 'collab') return 'tag-collab';
	if (t === 'python') return 'tag-tooling';
	return 'tag-default';
}
