<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { getIncidentUpdates } from '$lib/api/incident.remote';
	import { formatIncidentDate } from '$lib/utils';

	const id = $derived(page.params.id);
	const updatesPromise = $derived(getIncidentUpdates(id!));

	const iconMap: { [key: string]: string } = {
		Info: 'ic:baseline-info',
		Hypothesis: 'ic:baseline-lightbulb',
		Decision: 'ic:baseline-check-circle',
		Action: 'ic:baseline-build',
		Status: 'ic:baseline-signal-cellular-alt'
	};

	const sortedUpdates = $derived(
		updatesPromise.then((updates) =>
			updates.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
		)
	);
</script>

<div class="w-full overflow-x-auto">
	{#await sortedUpdates}
		<p>Loading updates...</p>
	{:then updates}
		<ol class="flex items-start gap-8 pb-4">
			{#each updates as entry, i}
				<li class="relative flex min-w-[280px] flex-col items-start">
					<!-- Horizontal connecting line -->
					{#if i !== updates.length - 1}
						<div class="absolute top-6 left-[50%] h-[2px] w-[calc(100%+2rem)] bg-surface-300"></div>
					{/if}

					<!-- Icon Badge -->
					<div
						class="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500"
					>
						<Icon icon={iconMap[entry.type]} class="text-white" width="24" height="24" />
					</div>

					<!-- Content -->
					<div class="w-full">
						<h4 class="mb-1 text-lg font-semibold">{entry.title}</h4>
						<p class="mb-2 text-sm text-surface-500">{formatIncidentDate(entry.createdAt)}</p>
						{#if entry.description}
							<p class="text-sm text-surface-600">{entry.description}</p>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	{:catch error}
		<p class="text-error-500">Error loading updates: {error.message}</p>
	{/await}
</div>
