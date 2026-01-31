<script lang="ts">
	let presentPeople = $state([
		{
			name: 'Bartlomiej Kordalski',
			team: 'Incident Manager'
		},
		{
			name: 'John',
			team: 'Web OPS'
		},
		{
			name: 'Jane',
			team: 'Incident Manager'
		},
		{
			name: 'John',
			team: 'Web OPS'
		},
		{
			name: 'Jane',
			team: 'Incident Manager'
		},
		{
			name: 'John',
			team: 'Web OPS'
		},
		{
			name: 'Jane',
			team: 'Incident Manager'
		},
		{
			name: 'John',
			team: 'Web OPS'
		},
		{
			name: 'Jane',
			team: 'Incident Manager'
		},
		{
			name: 'John',
			team: 'Web OPS'
		},
		{
			name: 'Jane',
			team: 'Incident Manager'
		},
		{
			name: 'John',
			team: 'Web OPS'
		},
		{
			name: 'Jane',
			team: 'Incident Manager'
		}
	]);
</script>

<div
	class="sticky top-4 flex h-[calc(100vh-2rem)] flex-col card p-4 text-start shadow-md shadow-surface-500/50"
>
	<h2 class="mb-4 text-lg font-semibold">War Room Presence</h2>

	<div class="table-wrap overflow-y-auto">
		<table class="table caption-bottom">
			<thead class="sticky top-0 bg-surface-100 dark:bg-surface-900">
				<tr>
					<th class="text-text-primary">Name</th>
					<th class="text-text-primary">Team</th>
				</tr>
			</thead>
			<tbody class="[&>tr]:hover:preset-tonal-primary">
				{#each presentPeople as person}
					<tr>
						<td>{person.name}</td>
						<td class="text-text-secondary">{person.team}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot class="sticky bottom-0 bg-surface-100 dark:bg-surface-900">
				<tr>
					<td>Total</td>
					<td class="text-right">{presentPeople.length} People</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
