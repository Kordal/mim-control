<script lang="ts">
	import Icon from '@iconify/svelte';

	import { SegmentedControl, Switch } from '@skeletonlabs/skeleton-svelte';

	const items = [
		{ value: 'Info', icon: 'ic:baseline-info' },
		{ value: 'Hypothesis', icon: 'ic:baseline-lightbulb' },
		{ value: 'Decision', icon: 'ic:baseline-check-circle' },
		{ value: 'Action', icon: 'ic:baseline-build' },
		{ value: 'Status', icon: 'ic:baseline-signal-cellular-alt' }
	];

	let checked = $state(false);
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
	<SegmentedControl>
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
					<SegmentedControl.ItemHiddenInput />
				</SegmentedControl.Item>
			{/each}
		</SegmentedControl.Control>
	</SegmentedControl>
{/snippet}

<section
	class="mt-2 mb-4 card preset-filled-surface-100-900 p-4 text-start shadow-md shadow-surface-500/50"
>
	<div>
		{@render textControl()}
		<textarea
			class="h-20 w-full rounded-md border border-surface-300 shadow-md shadow-surface-400/30 md:h-60"
		></textarea>
	</div>
	<div class="flex items-center justify-end">
		{@render switchEmail()}
		<div class="ml-2 flex justify-end p-2">
			<button
				class="btn flex items-center gap-2 preset-filled px-6 py-2 shadow-md shadow-surface-400/30"
			>
				<Icon icon="ic:baseline-send" />
				<span>Send</span>
			</button>
		</div>
	</div>
</section>
