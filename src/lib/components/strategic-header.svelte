<script lang="ts">
	import type { incidents } from '$lib/server/db/schema';

	type Incident = typeof incidents.$inferSelect;

	let { incident }: { incident: Incident } = $props();

	const formattedDate = $derived(
		incident.createdAt
			? new Intl.DateTimeFormat('en-US', {
					month: 'short',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					timeZoneName: 'short'
				}).format(new Date(incident.createdAt))
			: 'Unknown'
	);

	/**
	 * Calculates the duration between incident creation and resolution.
	 * @param createdAt - The timestamp when the incident was created
	 * @param resolvedAt - The timestamp when the incident was resolved (optional)
	 * @returns A formatted duration string, or null if not resolved
	 */
	function calculateResolutionDuration(
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

	//DURATION CALC;

	let now = $state(new Date());

	$effect(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);
		return () => clearInterval(interval);
	});

	const duration = $derived.by(() => {
		if (!incident.createdAt) return '00:00:00';

		// Get difference in seconds
		const diff = Math.floor((now.getTime() - new Date(incident.createdAt).getTime()) / 1000);

		if (diff < 0) return '00:00:00';

		const hours = Math.floor(diff / 3600);
		const minutes = Math.floor((diff % 3600) / 60);
		const seconds = diff % 60;

		return [hours, minutes, seconds].map((v) => v.toString().padStart(2, '0')).join(':');
	});
</script>

<section
	class="border-DEFAULT gap-6 rounded-xl border bg-background-panel p-6 shadow-lg md:flex md:justify-center"
>
	<div class="gap-3">
		<p class="flex min-w-2xs items-center gap-3">
			<span class="rounded-full bg-status-critical px-2 py-1 text-xs text-text-primary">
				{incident.severity}
			</span>
			<span class="text-text-secondary">Started: {formattedDate}</span>
		</p>
		<h1 class="text-text-primary">{incident.publicId}: {incident.title}</h1>
		<p class="text-text-secondary">
			Impact: {incident.impactedServices?.join(', ') || 'Global'}
		</p>
	</div>
	<div class="gap-6 py-2 pl-6 md:border-l">
		<p class="text-xs text-text-secondary">Duration</p>
		<p class="text-4xl text-text-primary">
			{incident.status === 'SOLVED'
				? calculateResolutionDuration(incident.createdAt, incident.resolvedAt)
				: duration}
		</p>
		<div class="text-xs">
			<p>
				Expected Next Update:
				<span class="text-text-secondary"> 00:01:30</span>
			</p>
		</div>
	</div>
	<div class=" gap-6 py-2 pl-6 md:border-l">
		<p class="text-xs text-text-secondary">Current Status:</p>
		<p class="text-4xl text-text-primary">{incident.status}</p>
	</div>
</section>
