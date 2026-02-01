<script lang="ts">
	import { createIncident } from '$lib/api/incident.remote';
	import Icon from '@iconify/svelte';

	//TODO: get later from DB
	const availableServices = [
		'Mobile App',
		'Web Application',
		'API Gateway',
		'Payment Service',
		'Database',
		'Authentication Service',
		'Notification Service',
		'Storage Service'
	];
	//TODO: get later from DB
	const severityOptions = ['P1', 'P2', 'P3'];

	const statusOptions = ['ONGOING', 'MITIGATED', 'SOLVED'];

	let searchInput = $state('');
	let selectedServices = $state<string[]>([]);
	let showServiceDropdown = $state(false);

	let filteredServices = $derived(
		availableServices
			.filter((service) => !selectedServices.includes(service)) // Exclude selected
			.filter((service) => service.toLowerCase().includes(searchInput.toLowerCase())) // Search filter
	);

	function addService(service: string) {
		if (service && !selectedServices.includes(service)) {
			selectedServices = [...selectedServices, service];
			searchInput = '';
			showServiceDropdown = false;
		}
	}

	function handleServiceKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			//addService(searchInput);
		}
	}
</script>

{#snippet serviceDropdown()}
	<div
		class="absolute top-full left-0 z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-surface-300 bg-surface-50 shadow-lg dark:border-surface-700 dark:bg-surface-900"
	>
		<ul class="py-1">
			{#each filteredServices as service}
				<li class="px-4 py-2 hover:bg-surface-600">
					<button onclick={() => addService(service)}>{service}</button>
				</li>
			{/each}
		</ul>
	</div>
{/snippet}
<div class="mx-auto max-w-4xl p-4">
	<form {...createIncident}>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div
				class="col-span-1 card preset-filled-surface-100-900 p-6 text-start shadow-md shadow-surface-500/50"
			>
				<h2 class="mb-4 text-xl font-semibold">Basic Information</h2>
				<div class="flex flex-col gap-4">
					<div>
						<label for="incId"> Incident ID </label>
						<input {...createIncident.fields.incId.as('text')} class="input w-full" />
					</div>
					<div>
						<label for="title"> Incident Title </label>
						<input {...createIncident.fields.title.as('text')} class="input w-full" />
					</div>
					<div>
						<label for="description"> Incident Description </label>
						<textarea {...createIncident.fields.description.as('text')} class="input w-full"
						></textarea>
					</div>
				</div>
			</div>
			<div
				class="col-span-1 card preset-filled-surface-100-900 p-6 text-start shadow-md shadow-surface-500/50"
			>
				<h2 class="mb-4 text-xl font-semibold">Impacted Services</h2>
				<div class="flex flex-col gap-4">
					<div>
						<label for="impactedServices"> Search & Add Services</label>
						<div class="relative flex gap-2">
							<input
								bind:value={searchInput}
								class="input w-full"
								id="impactedServices"
								type="text"
								placeholder="Search services..."
								onfocus={() => (showServiceDropdown = true)}
								onblur={() => setTimeout(() => (showServiceDropdown = false), 200)}
								onkeydown={handleServiceKeydown}
								autocomplete="off"
							/>
							{#if showServiceDropdown}
								{@render serviceDropdown()}
							{/if}
						</div>
						<div>
							<ul class="mt-4">
								{#each selectedServices as service}
									<li class="mb-2 flex justify-between gap-2">
										<span>{service}</span>
										<button
											type="button"
											onclick={() => {
												selectedServices = selectedServices.filter((s) => s !== service);
											}}
										>
											<Icon icon="mdi:delete" />
										</button>
									</li>
								{/each}
							</ul>
						</div>
						<input
							{...createIncident.fields.impactedServices.as('text')}
							class="hidden"
							value={selectedServices.join(',')}
						/>
					</div>
				</div>
				<div>
					<label for="severity">Severity</label>
					<select {...createIncident.fields.severity.as('text')} class="input w-full">
						{#each severityOptions as severity}
							<option value={severity}>{severity}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="status">Status</label>
					<select {...createIncident.fields.status.as('text')} class="input w-full">
						{#each statusOptions as status}
							<option value={status}>{status}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		<div class="mt-4 flex justify-end">
			<button
				type="submit"
				class="btn flex items-center gap-2 preset-filled px-6 py-2 shadow-md shadow-surface-400/30"
				>Create Incident</button
			>
		</div>
	</form>
</div>
