/**
 * Derive a tag colour from its name using a hash.
 * Returns an inline style string — no CSS classes needed.
 */

function hashTag(tag: string): number {
	// FNV-1a with bit mixing for better short-string distribution
	let h = 2166136261;
	for (let i = 0; i < tag.length; i++) {
		h ^= tag.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	// Final avalanche — mix bits so close hashes produce distant hues
	h ^= h >>> 16;
	h = Math.imul(h, 0x45d9f3b);
	h ^= h >>> 13;
	return h >>> 0;
}

export function tagStyle(tag: string): string {
	const h = hashTag(tag.toLowerCase());
	const hue = h % 360;
	const sat = 30 + ((h >>> 8) % 30);       // 30–59%
	const lit = 60 + ((h >>> 16) % 18);       // 60–77%
	return `color: hsl(${hue}, ${sat}%, ${lit}%); background: hsla(${hue}, ${sat}%, ${lit}%, 0.15);`;
}
