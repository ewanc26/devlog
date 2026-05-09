/**
 * Format an ISO 8601 datetime string (YYYY-MM-DDTHH:MM:SSZ)
 * using the browser/system locale, falling back to en-GB.
 * Shows full date and time: "9 May 2026, 15:11:00 UTC"
 */
export function formatDate(dateStr: string, timeStr?: string): string {
	if (!dateStr) return '';

	// Build the full datetime string for parsing
	const datetime = timeStr ? `${dateStr}T${timeStr}:00Z` : dateStr;
	const date = new Date(datetime);
	if (isNaN(date.getTime())) return dateStr;

	const locales =
		typeof navigator !== 'undefined' && navigator.languages?.length
			? [...navigator.languages, 'en-GB']
			: ['en-GB'];

	const formatted = new Intl.DateTimeFormat(locales, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short'
	}).format(date);

	return formatted;
}
