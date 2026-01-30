<script>
	import Icon from '@iconify/svelte';

	// High-priority incident log
	let incidents = [
		{
			timestamp: '2026-01-30 21:45',
			title: 'Service Restoration',
			description:
				'Database primary node successfully failed over. Traffic routing restored to 100%. Monitoring for stability.',
			completed: true,
			status: 'resolved'
		},
		{
			timestamp: '2026-01-30 21:30',
			title: 'Root Cause Identified',
			description:
				'Connection pool exhaustion on the API cluster due to a spike in unoptimized queries from the legacy analytics service.',
			completed: false,
			status: 'investigating'
		},
		{
			timestamp: '2026-01-30 21:15',
			title: 'Status Update: High Severity',
			description:
				'Engineering teams have been paged. Investigating 5xx errors across the checkout microservice.',
			completed: true,
			status: 'active'
		},
		{
			timestamp: '2026-01-30 21:05',
			title: 'Incident Detected',
			description: 'Automated alert triggered: Latency exceeding 500ms for 5% of global users.',
			completed: true,
			status: 'detected'
		}
	];

	// Sorting: Newest (latest timestamp) first
	$: sortedIncidents = [...incidents].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);

	function formatDisplayDate(dateStr) {
		return new Date(dateStr).toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}
</script>

<!-- Fix later the type when DB ready -->
{#snippet content(entry)}
	<div class="mt-2 flex flex-1 flex-col gap-1">
		<time class="text-xs font-medium text-text-secondary">
			{formatDisplayDate(entry.timestamp)}
		</time>
		<h3 class="text-base font-semibold text-text-primary">
			{entry.title}
		</h3>
		<p class="text-sm leading-relaxed text-text-secondary">
			{entry.description}
		</p>
		<button class="ml-auto btn w-fit preset-outlined-primary-50-950">
			<Icon icon="ic:baseline-delete-forever" />
		</button>
	</div>
{/snippet}

<div class="mt-2 card preset-filled-surface-100-900 p-4 text-start shadow-md shadow-surface-500/50">
	<div class="mb-4">
		<h2 class="text-lg font-semibold">Timeline</h2>
	</div>

	<div class="relative">
		{#each sortedIncidents as entry, i}
			<div class="relative flex gap-4 pb-8 last:pb-0">
				<!-- Vertical line -->
				{#if i !== sortedIncidents.length - 1}
					<div class="absolute top-7 left-[11px] h-full w-[2px] bg-surface-300"></div>
				{/if}

				<!-- Circle marker -->
				<div class="relative z-10 shrink-0">
					<div
						class="h-6 w-6 rounded-full border-2 border-surface-400 bg-surface-100 dark:bg-surface-800"
					></div>
				</div>

				<!-- Content -->
				{@render content(entry)}
			</div>
		{/each}
	</div>
</div>
