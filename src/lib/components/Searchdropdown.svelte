<script>
	let query = $state('');
	let isOpen = $state(false);

	//TODO: Change to take it from DB, not hardcoded
	let items = $state([
		{ id: '1', name: 'One' },
		{ id: '2', name: 'Two' },
		{ id: '3', name: 'Three' }
	]);

	//Need to bind it in the parent
	let { selected = $bindable([]) } = $props();
	$inspect(selected);

	let filteredItems = $derived(
		query.length > 0
			? items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
			: []
	);
</script>

<div class="inline-block border border-border bg-background-panel">
	<input
		class="text-primary"
		type="search"
		bind:value={query}
		onfocus={() => (isOpen = true)}
		onblur={() => setTimeout(() => (isOpen = false), 200)}
	/>

	{#if isOpen && filteredItems.length > 0}
		<ul class="flex flex-col">
			{#each filteredItems as item (item.id)}
				<button
					onclick={() => {
						selected = [...selected, item.name];
						query = item.name;
						isOpen = false;
					}}
				>
					{item.name}
				</button>
			{/each}
		</ul>
	{/if}
</div>
