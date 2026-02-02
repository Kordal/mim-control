<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';

	import { SegmentedControl, Switch } from '@skeletonlabs/skeleton-svelte';

	import { createIncidentLog } from '$lib/api/incident.remote';
	import { page } from '$app/state';

	const items = [
		{ value: 'Info', icon: 'ic:baseline-info' },
		{ value: 'Hypothesis', icon: 'ic:baseline-lightbulb' },
		{ value: 'Decision', icon: 'ic:baseline-check-circle' },
		{ value: 'Action', icon: 'ic:baseline-build' },
		{ value: 'Status', icon: 'ic:baseline-signal-cellular-alt' }
	];

	const id = $derived(page.params.id);

	let checked = $state(false);
	let typeX = $state<string | null>('Info');
</script>

{#snippet switchEmail()}
	<div class="flex flex-col items-center gap-4">
		<Switch {checked} onCheckedChange={(details) => (checked = details.checked)}>
			<Switch.Control>
				<Switch.Thumb />
			</Switch.Control>
			<Switch.Label>
				<div class="flex items-center gap-1">
					<Icon width="32" height="32" icon="ic:baseline-email" />
					<span>Generate E-mail</span>
				</div>
			</Switch.Label>
			<Switch.HiddenInput />
		</Switch>
	</div>
{/snippet}

<!-- This is the selector for what type of message is the user creating -->
{#snippet textControl()}
	<SegmentedControl value={typeX} onValueChange={(details) => (typeX = details.value)} class="mb-1">
		<SegmentedControl.Label />
		<SegmentedControl.Control>
			<SegmentedControl.Indicator />
			{#each items as item}
				<SegmentedControl.Item value={item.value}>
					<SegmentedControl.ItemText>
						<div class="flex items-center gap-1">
							<Icon icon={item.icon} />
							{item.value}
						</div>
					</SegmentedControl.ItemText>
					<SegmentedControl.ItemHiddenInput></SegmentedControl.ItemHiddenInput>
				</SegmentedControl.Item>
			{/each}
		</SegmentedControl.Control>
	</SegmentedControl>
{/snippet}

<form
	use:enhance
	{...createIncidentLog}
	class="mt-2 mb-4 card preset-filled-surface-100-900 p-4 text-start shadow-md shadow-surface-500/50"
>
	<div>
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-lg font-semibold">Update Incident</h2>
		</div>
		{@render textControl()}

		<textarea
			{...createIncidentLog.fields.description.as('text')}
			class="mb-4 w-full rounded-md border border-surface-300 shadow-md shadow-surface-400/30"
			placeholder="Type the description of the update"
		></textarea>
		<textarea
			{...createIncidentLog.fields.metadata.as('text')}
			class="h-20 w-full rounded-md border border-surface-300 shadow-md shadow-surface-400/30 md:h-60"
			placeholder="Type the metadata of the update"
		></textarea>
	</div>
	<input type="hidden" name="incidentId" value={id} />
	<input type="hidden" name="type" value={typeX?.toLowerCase()} />
	<div class="flex items-center justify-end">
		{@render switchEmail()}
		<div class="ml-2 flex justify-end p-2">
			<button
				type="submit"
				class="btn flex items-center gap-2 preset-filled px-6 py-2 shadow-md shadow-surface-400/30"
			>
				<Icon icon="ic:baseline-send" />
				<span>Send</span>
			</button>
		</div>
	</div>
</form>
