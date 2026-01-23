<script lang="ts">
	import type { Team } from '$lib/utils/types';

	let {
		team,
		onAdd,
		onRemove
	}: {
		team: Team;
		onAdd?: (team: Team) => void;
		onRemove?: (team: Team) => void;
	} = $props();

	let isAdded = $derived(team.isAdded);
</script>

<div class="inline-block rounded-lg border border-border p-2">
	<section>
		<div class="flex flex-row gap-2">
			<div class="text-lg font-medium text-text-primary">{team.name}</div>
			<div class="flex items-center gap-2">
				<span class="text-sm font-medium text-text-tertiary">{team.tags.join(', ')}</span>
			</div>
			<div class=" ml-auto flex items-center gap-2">
				<span class=" rounded-md border border-border bg-background-panel p-2"
					>On Call: {team.onCall}</span
				>
			</div>
			{#if !isAdded}
				<button
					onclick={() => {
						onAdd?.({
							...team,
							isAdded: true
						});
					}}
					class="ml-auto rounded-md border border-border bg-status-critical p-2"
					>Add to Roster</button
				>
			{:else}
				<button
					onclick={() => {
						onRemove?.({
							...team,
							isAdded: false
						});
					}}
					class="ml-auto rounded-md border border-border bg-status-success p-2">Remove</button
				>
			{/if}
		</div>
	</section>
</div>
