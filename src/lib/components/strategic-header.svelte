<script lang="ts">
	import type { incidents } from '$lib/server/db/schema';
	import { calculateResolutionDuration, formatIncidentDate, formatElapsedTime } from '$lib/utils';
	type Incident = typeof incidents.$inferSelect;
	let { incident }: { incident: Incident } = $props();
	const formattedDate = $derived(formatIncidentDate(incident.createdAt));
	let now = $state(new Date());
	$effect(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);
		return () => clearInterval(interval);
	});
	const duration = $derived(formatElapsedTime(incident.createdAt, now));
	const lastUpdate = $derived(formatElapsedTime(incident.updatedAt, now));
</script>

<section
	class="gap-6 rounded-xl border border-border bg-background-panel p-6 shadow-lg md:flex md:justify-center"
>
	<div class="gap-3">
		<p class="flex min-w-2xs items-center gap-3">
			<span class="rounded-full bg-status-critical px-2 py-1 text-xs text-text-primary">
				{incident.severity}
			</span>
			<span class="text-text-secondary">Started: {formattedDate}</span>
		</p>
		<h1 class="text-text-primary">{incident.publicId}: {incident.title}</h1>
		<p class="text-text-secondary">Impact:</p>
		<ul class="flex gap-2">
			{#each incident.impactedServices as service}
				<div
					class="dark:bg-surface-dark flex h-8 shrink-0 items-center gap-x-2 rounded-lg border border-slate-300 bg-slate-200 px-3 transition-colors dark:border-slate-700"
				>
					<span class="text-sm font-medium text-text-tertiary">{service}</span>
				</div>
			{/each}
		</ul>
	</div>
	<div class="gap-6 py-2 md:border-l md:border-border md:pl-6">
		<p class="text-xs text-text-secondary">Duration</p>
		<p class="text-4xl text-text-primary">
			{incident.status === 'SOLVED'
				? calculateResolutionDuration(incident.createdAt, incident.resolvedAt)
				: duration}
		</p>
		<div class="text-xs">
			<p>
				Last Update:
				<span class="text-text-secondary"> {lastUpdate}</span>
			</p>
		</div>
	</div>
	<div class=" gap-6 py-2 md:border-l md:border-border md:pl-6">
		<p class="text-xs text-text-secondary">Current Status:</p>
		<p class="text-4xl text-text-primary">{incident.status}</p>
	</div>
</section>
