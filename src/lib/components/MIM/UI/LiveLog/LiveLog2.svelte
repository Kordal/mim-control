<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getIncidentLogs } from '$lib/api/incident.remote';
	import { page } from '$app/state';
	import { formatRelativeTime } from '$lib/utils/date';

	const id = $derived(page.params.id);
</script>

<div class="mb-4 ml-2 flex shrink-0 items-center justify-between">
	<h2 class="text-lg font-semibold">Live Activity Log</h2>
	<!-- TODO: Add refresh button -->
	<button onclick={() => getIncidentLogs(id!).refresh()} class="btn preset-tonal-primary btn-sm">
		<Icon icon="ic:baseline-refresh" class="text-base" />
	</button>
</div>
<div class="relative">
	<!-- The vertical line -->

	<div class="absolute top-0 left-4 h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>
	{#await getIncidentLogs(id!)}
		<!-- Loading state -->
		<div class="py-8 text-center text-text-secondary">
			<Icon icon="ic:baseline-refresh" class="mx-auto mb-2 animate-spin text-4xl opacity-30" />
			<p class="text-sm">Loading activity...</p>
		</div>
	{:then logs}
		{#if logs.length === 0}
			<!-- Empty state -->
			<div class="py-8 text-center text-text-secondary">
				<Icon icon="ic:baseline-event-note" class="mx-auto mb-2 text-4xl opacity-30" />
				<p class="text-sm">No activity yet</p>
			</div>
		{:else}
			{#each logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) as log}
				<div
					class="relative mb-4 flex gap-3 rounded-lg p-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<!-- Icon -->
					<div
						class="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white ring-2 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700"
					>
						<Icon icon="ic:baseline-check" class="text-base text-green-500" />
					</div>

					<!-- Content -->
					<div class="min-w-0 flex-1">
						<div class="flex items-start justify-between gap-2">
							<p class="warp-break-words text-sm font-medium">
								[{log.type.toUpperCase()}]: {log.description}
							</p>
							<span class="shrink-0 text-xs whitespace-nowrap text-gray-500"
								>{formatRelativeTime(log.timestamp)}
							</span>
						</div>
						<p class="mt-1 text-xs text-gray-500">
							by <span class="font-medium">{log.userName}</span>
						</p>
						{#if log.metadata}
							<p class="mt-1 text-xs text-gray-500">
								{log.metadata}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	{/await}
</div>
