<script lang="ts">
	import { createIncident } from '$lib/api/incident.remote';
	import Searchdropdown from '$lib/components/Searchdropdown.svelte';

	let impactedServices = $state<string[]>([]);
	$inspect(impactedServices);
</script>

<section class="flex min-h-screen items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg bg-background-panel p-4 md:p-6">
		<form {...createIncident}>
			<div class="mb-2 flex flex-col gap-2">
				<label class="text-text-secondary" for="publicId">Incident ID</label>
				<input
					class="border-subtle rounded-md border p-2 text-text-secondary"
					{...createIncident.fields.publicId.as('text')}
					type="text"
					id="publicId"
					name="publicId"
				/>
			</div>

			<div class="mb-2 flex flex-col gap-2">
				<label class="text-text-secondary" for="title">Title</label>
				<input
					class="border-subtle rounded-md border p-2 text-text-secondary"
					{...createIncident.fields.title.as('text')}
					type="text"
					id="title"
					name="title"
				/>
			</div>
			<div class="mb-2 flex flex-col gap-2">
				<label class="text-text-secondary" for="description">Description</label>
				<textarea
					class="border-subtle h-24 rounded-md border p-2 text-text-secondary"
					{...createIncident.fields.description.as('text')}
					id="description"
					name="description"
				></textarea>
			</div>
			<div>
				<hr class="my-6 border border-border md:my-10" />
			</div>
			<div class="mb-4 flex flex-col items-center justify-center gap-2">
				<p class="mb-2 text-sm text-text-secondary">Status</p>
				<div class="flex flex-wrap items-center justify-center gap-2 md:gap-4">
					§ {#each ['ONGOING', 'MITIGATED', 'SOLVED'] as value}
						<div class="relative">
							<input
								{...createIncident.fields.status.as('radio', value)}
								class="peer sr-only"
								type="radio"
								name="status"
								id="status-{value}"
							/>
							<label
								class="border-subtle cursor-pointer rounded-md border p-2 text-text-secondary transition-all peer-checked:border-button-primary peer-checked:bg-button-primary peer-checked:text-white"
								for="status-{value}"
							>
								{value}
							</label>
						</div>
					{/each}
				</div>
			</div>
			<div class="mb-4 flex flex-col items-center justify-center gap-2">
				<p class="mb-2 text-sm text-text-secondary">Severity</p>
				<div class="flex flex-wrap items-center justify-center gap-2 md:gap-4">
					{#each ['P1', 'P2', 'P3'] as value}
						<div class="relative">
							<input
								{...createIncident.fields.severity.as('radio', value)}
								class="peer sr-only text-background"
								type="radio"
								name="severity"
								id="severity-{value}"
							/>
							<label
								class=" border-subtle cursor-pointer rounded-md border p-2 text-background text-text-secondary transition-all peer-checked:border-button-primary peer-checked:bg-button-primary peer-checked:text-white"
								for="severity-{value}"
							>
								{value}
							</label>
						</div>
					{/each}
				</div>
			</div>
			<hr class="my-6 border border-border md:my-10" />

			<div class="mb-4 flex flex-col gap-2">
				<Searchdropdown bind:selected={impactedServices}></Searchdropdown>
				<input type="hidden" name="impactedServices" value={impactedServices.join(',')} />
			</div>
			<div class="flex justify-end">
				<button class="rounded-md bg-button-primary p-2 text-background">Create Incident</button>
			</div>
		</form>
	</div>
</section>
