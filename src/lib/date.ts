/**
 * Format a YYYY-MM-DD date string using the browser/system locale,
 * falling back to en-GB if unavailable.
 * Optionally appends a HH:MM time string.
 */
export function formatDate(dateStr: string, timeStr?: string): string {
	if (!dateStr) return '';
	const date = new Date(`${dateStr}T12:00:00Z`);
	if (isNaN(date.getTime())) return dateStr;

	const locales =
		typeof navigator !== 'undefined' && navigator.languages?.length
			? [...navigator.languages, 'en-GB']
			: ['en-GB'];

	const formatted = new Intl.DateTimeFormat(locales, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(date);

	if (timeStr) {
		return `${formatted}, ${timeStr}`;
	}

	return formatted;
}
