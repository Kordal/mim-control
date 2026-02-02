<script lang="ts">
	import Icon from '@iconify/svelte';
	import ServiceBadge from '../ServiceBadge/ServiceBadge.svelte';
	import { getIncidentDetail } from '$lib/api/incident.remote';
	import { page } from '$app/state';
	import { formatElapsedTime, formatIncidentDate } from '$lib/utils';

	//TODO: get later from DB
	const serviceList = $state([
		'Mobile',
		'Web',
		'ATM',
		'POSssssssssssssss',
		'Internet',
		'Mobile',
		'Web',
		'ATM',
		'POSssssssssssssss',
		'Internet',
		'Mobile',
		'Web',
		'ATM',
		'POSssssssssssssss',
		'Internet'
	]);

	const id = $derived(page.params.id);
	const incPromise = $derived(getIncidentDetail(id!));

	let currentTime = $state(new Date());
	// Set up an interval to update the time
	$effect(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 1000); // Update every 1 second (or use 60000 for every minute)
		// Cleanup function to clear the interval when component is destroyed
		return () => {
			clearInterval(interval);
		};
	});
</script>

{#await incPromise}
	<div
		class="mb-4 card preset-filled-surface-100-900 p-4 text-start shadow-md shadow-surface-500/50"
	>
		<p>Loading incident details...</p>
	</div>
{:then inc}
	<div
		class="mb-4 card preset-filled-surface-100-900 p-4 text-start shadow-md shadow-surface-500/50"
	>
		<div class="grid grid-cols-[1fr_1px_1fr]">
			<div class="p-4">
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<p
							class="blink-red badge inline-block w-16 truncate preset-filled text-center text-sm font-bold text-white shadow-lg shadow-neutral-500/20"
						>
							{inc.severity}
						</p>
						<h1 class="text-lg font-bold">{inc.incId}</h1>
					</div>
					<p class="text-sm text-text-secondary">{inc.title}</p>
					<div class="flex flex-col items-center justify-between gap-2 lg:flex-row">
						<div class="flex items-center gap-2">
							<Icon icon="ic:outline-timer" />
							<span class="text-sm text-text-primary">{formatIncidentDate(inc.createdAt)}</span>
						</div>
						<div class="flex items-center gap-2">
							<Icon icon="ic:baseline-email" />
							<p class="text-sm text-text-secondary">
								Last Update: <span class="text-text-primary"
									>{formatElapsedTime(inc.createdAt, currentTime)}</span
								>
							</p>
						</div>
					</div>
					<div class="hr"></div>
				</div>
			</div>
			<span class="row-span-2 vr border-l"></span>

			<div class="col-span-1 mt-2 flex flex-col justify-start p-4">
				<p class="mb-2 text-sm text-text-secondary">Impacted Services:</p>
				<div class="ml-2">
					<ul class="flex flex-wrap gap-2">
						{#each inc.impactedServices as service}
							<li class="">
								<ServiceBadge>{service}</ServiceBadge>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
{/await}

<style>
	.preset-glass-error {
		background: color-mix(in oklab, var(--color-error-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-error-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}

	.blink-red {
		animation: blink 2s ease-in-out infinite;
	}
	@keyframes blink {
		0%,
		100% {
			opacity: 1;
			background: color-mix(in oklab, var(--color-error-900) 40%, transparent);
		}
		50% {
			opacity: 0.3;
			background: color-mix(in oklab, var(--color-error-900) 80%, transparent);
		}
	}
</style>
