/**
 * Calculates the duration between incident creation and resolution.
 * Returns a human-readable string formatted as "Xd Xh Xm" or "Xh Xm" etc.
 *
 * @param createdAt - The timestamp when the incident was created
 * @param resolvedAt - The timestamp when the incident was resolved
 * @returns A formatted duration string, or null if either date is missing
 * @example calculateResolutionDuration(new Date('2024-01-01'), new Date('2024-01-02')) // "1d 0h 0m"
 */
export function calculateResolutionDuration(
	createdAt: Date | null,
	resolvedAt: Date | null
): string | null {
	if (!createdAt || !resolvedAt) {
		return null;
	}

	const durationMs = resolvedAt.getTime() - createdAt.getTime();

	const seconds = Math.floor(durationMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		return `${days}d ${hours % 24}h ${minutes % 60}m`;
	} else if (hours > 0) {
		return `${hours}h ${minutes % 60}m`;
	} else if (minutes > 0) {
		return `${minutes}m ${seconds % 60}s`;
	} else {
		return `${seconds}s`;
	}
}

/**
 * Formats a date for display in the incident header.
 * Uses US locale with short month, day, time, and timezone.
 *
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Jan 23, 06:45 AM EST") or "Unknown" if null
 * @example formatIncidentDate(new Date()) // "Jan 23, 06:45 AM EST"
 */
export function formatIncidentDate(date: Date | null): string {
	if (!date) return 'Unknown';
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short'
	}).format(new Date(date));
}
/**
 * Calculates and formats the elapsed time since a start date.
 * Returns a live timer format suitable for active incidents.
 *
 * @param startDate - The start timestamp (e.g., incident creation)
 * @param now - The current time (typically from a reactive state)
 * @returns Time elapsed as "HH:MM:SS" format, or "00:00:00" if invalid
 * @example formatElapsedTime(new Date('2024-01-01T00:00:00'), new Date('2024-01-01T01:30:45')) // "01:30:45"
 */
export function formatElapsedTime(startDate: Date | null, now: Date): string {
	if (!startDate) return '00:00:00';

	const diff = Math.floor((now.getTime() - new Date(startDate).getTime()) / 1000);
	if (diff < 0) return '00:00:00';

	const hours = Math.floor(diff / 3600);
	const minutes = Math.floor((diff % 3600) / 60);
	const seconds = diff % 60;

	return [hours, minutes, seconds].map((v) => v.toString().padStart(2, '0')).join(':');
}

// Return time ago like "1m ago", "2h ago", "3d ago"
export function formatRelativeTime(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return 'Just now';
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	return `${diffDays}d ago`;
}
