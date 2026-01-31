<script lang="ts">
	import Icon from '@iconify/svelte';

	// Type definitions for log entries
	type LogEventType =
		| 'task_complete'
		| 'status_change'
		| 'assignment'
		| 'comment'
		| 'escalation'
		| 'impact_update';

	type LogEntry = {
		id: string;
		type: LogEventType;
		timestamp: Date;
		user: string;
		description: string;
		metadata?: Record<string, any>;
	};

	// Event type configuration (icons & colors)
	const eventConfig: Record<LogEventType, { icon: string; color: string }> = {
		task_complete: { icon: 'ic:baseline-check-circle', color: 'text-success-500' },
		status_change: { icon: 'ic:baseline-swap-horiz', color: 'text-warning-500' },
		assignment: { icon: 'ic:baseline-person-add', color: 'text-primary-500' },
		comment: { icon: 'ic:baseline-comment', color: 'text-tertiary-500' },
		escalation: { icon: 'ic:baseline-priority-high', color: 'text-error-500' },
		impact_update: { icon: 'ic:baseline-trending-up', color: 'text-secondary-500' }
	};

	// Mock data - replace with real data from API/store
	let logEntries = $state<LogEntry[]>([
		{
			id: '1',
			type: 'task_complete',
			timestamp: new Date(Date.now() - 300000),
			user: 'John Doe',
			description: 'Marked "Investigate database logs" as complete'
		},
		{
			id: '2',
			type: 'status_change',
			timestamp: new Date(Date.now() - 900000),
			user: 'Jane Smith',
			description: 'Changed incident status from "Investigating" to "Identified"',
			metadata: { from: 'Investigating', to: 'Identified' }
		},
		{
			id: '3',
			type: 'assignment',
			timestamp: new Date(Date.now() - 1800000),
			user: 'Bart',
			description: 'Assigned "Database Team" to incident',
			metadata: { team: 'Database Team' }
		},
		{
			id: '4',
			type: 'comment',
			timestamp: new Date(Date.now() - 2700000),
			user: 'Sarah Connor',
			description: 'Added comment: "Seeing high load on DB-PROD-01"'
		},
		{
			id: '5',
			type: 'escalation',
			timestamp: new Date(Date.now() - 3600000),
			user: 'System',
			description: 'Incident escalated to P1 due to SLA breach'
		},
		{
			id: '6',
			type: 'impact_update',
			timestamp: new Date(Date.now() - 4500000),
			user: 'Mike Ross',
			description: 'Updated impact: Added "Mobile App" to affected services'
		},
		{
			id: '7',
			type: 'task_complete',
			timestamp: new Date(Date.now() - 5400000),
			user: 'Alice Johnson',
			description: 'Marked "Check firewall rules" as complete'
		},
		{
			id: '8',
			type: 'comment',
			timestamp: new Date(Date.now() - 6300000),
			user: 'Bob Martinez',
			description: 'Added comment: "Rolling back recent deployment"'
		}
	]);

	// Format relative time
	function formatRelativeTime(date: Date): string {
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
</script>

<div
	class="sticky top-4 flex h-[calc(100vh-2rem)] flex-col card p-4 text-start shadow-md shadow-surface-500/50"
>
	<!-- Header -->
	<div class="mb-4 flex flex-shrink-0 items-center justify-between">
		<h2 class="text-lg font-semibold">Live Activity Log</h2>
		<button class="btn preset-tonal-primary btn-sm">
			<Icon icon="ic:baseline-refresh" class="text-base" />
		</button>
	</div>

	<!-- Scrollable content area -->
	<div class="log-container flex-1 overflow-y-auto pr-2">
		<div class="relative">
			<!-- Timeline line -->
			<div
				class="timeline-line absolute top-0 left-4 h-full w-0.5 bg-surface-400 dark:bg-surface-600"
			></div>

			{#each logEntries as entry (entry.id)}
				<div
					class="log-entry relative mb-4 flex gap-3 rounded-lg p-3 transition-all hover:bg-surface-200/50 dark:hover:bg-surface-800/50"
				>
					<!-- Icon -->
					<div
						class="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-100 ring-2 ring-surface-300 dark:bg-surface-900 dark:ring-surface-700"
					>
						<Icon
							icon={eventConfig[entry.type].icon}
							class="text-base {eventConfig[entry.type].color}"
						/>
					</div>

					<!-- Content -->
					<div class="min-w-0 flex-1">
						<div class="flex items-start justify-between gap-2">
							<p class="text-sm font-medium break-words text-text-primary">{entry.description}</p>
							<span class="flex-shrink-0 text-xs whitespace-nowrap text-text-secondary"
								>{formatRelativeTime(entry.timestamp)}</span
							>
						</div>
						<p class="mt-1 text-xs text-text-secondary">
							by <span class="font-medium">{entry.user}</span>
						</p>

						{#if entry.metadata}
							<div class="mt-2 rounded-md bg-surface-200/50 p-2 dark:bg-surface-800/50">
								<pre class="text-xs text-text-secondary">{JSON.stringify(
										entry.metadata,
										null,
										2
									)}</pre>
							</div>
						{/if}
					</div>
				</div>
			{/each}

			{#if logEntries.length === 0}
				<div class="py-8 text-center text-text-secondary">
					<Icon icon="ic:baseline-event-note" class="mx-auto mb-2 text-4xl opacity-30" />
					<p class="text-sm">No activity yet</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Footer -->
	<div class="mt-4 flex-shrink-0 border-t border-surface-300 pt-3 dark:border-surface-700">
		<p class="text-xs text-text-secondary">
			<span class="font-semibold">{logEntries.length}</span> events recorded
		</p>
	</div>
</div>

<style>
	.log-container::-webkit-scrollbar {
		width: 6px;
	}

	.log-container::-webkit-scrollbar-track {
		background: transparent;
	}

	.log-container::-webkit-scrollbar-thumb {
		background: color-mix(in oklab, var(--color-surface-500) 50%, transparent);
		border-radius: 3px;
	}

	.log-container::-webkit-scrollbar-thumb:hover {
		background: var(--color-surface-500);
	}

	.log-entry {
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
