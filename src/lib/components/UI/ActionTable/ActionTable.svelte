<script>
	import Icon from '@iconify/svelte';

	// Svelte 5 State for deep reactivity
	let tableData = $state([
		{ id: '101', action: 'Contact vendor', pta: 'Alpha', status: 'Planned' },
		{ id: '102', action: 'Review logs', pta: 'Beta', status: 'Started' },
		{ id: '103', action: 'Update documentation', pta: 'Gamma', status: 'Completed' }
	]);

	const statusOptions = ['Planned', 'Started', 'Completed', 'Abandoned'];

	function addRow() {
		tableData.push({
			id: (tableData.length + 101).toString(),
			action: 'New action',
			pta: 'New Entry',
			status: 'Planned'
		});
	}

	function removeRow(index) {
		tableData.splice(index, 1);
	}
</script>

<div class="mt-2 card preset-filled-surface-100-900 p-4 text-start shadow-md shadow-surface-500/50">
	<h2 class="mb-4 text-lg font-semibold">Action Items</h2>

	<div class="overflow-x-auto rounded-lg">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-surface-300">
					<th class="px-4 py-3 text-left font-semibold text-text-primary">ID</th>
					<th class="px-4 py-3 text-left font-semibold text-text-primary">Action</th>
					<th class="px-4 py-3 text-left font-semibold text-text-primary">PTA</th>
					<th class="px-4 py-3 text-left font-semibold text-text-primary">Status</th>
					<th class="px-4 py-3 text-center font-semibold text-text-primary">Delete</th>
				</tr>
			</thead>

			<tbody class="divide-y divide-surface-200">
				{#each tableData as row, i (row)}
					<tr class="transition-colors hover:bg-surface-200/50">
						<td
							contenteditable="true"
							bind:textContent={row.id}
							class="px-4 py-3 text-text-secondary outline-none focus:bg-surface-100 focus:ring-2 focus:ring-primary-500"
						></td>

						<td
							contenteditable="true"
							bind:textContent={row.action}
							class="px-4 py-3 text-text-secondary outline-none focus:bg-surface-100 focus:ring-2 focus:ring-primary-500"
						></td>

						<td
							contenteditable="true"
							bind:textContent={row.pta}
							class="px-4 py-3 text-text-secondary outline-none focus:bg-surface-100 focus:ring-2 focus:ring-primary-500"
						></td>

						<td class="px-4 py-3">
							<select bind:value={row.status} class="select w-full">
								{#each statusOptions as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</td>

						<td class="px-4 py-3 text-center">
							<button onclick={() => removeRow(i)} class="preset-outlined-error btn btn-sm">
								<Icon icon="ic:baseline-delete-forever" />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="mt-4 border-t border-surface-300 pt-4">
			<button onclick={addRow} class="btn w-full preset-outlined-primary-50-950">
				<Icon icon="mdi:plus" />
				<span>Add New Row</span>
			</button>
		</div>
	</div>
</div>
