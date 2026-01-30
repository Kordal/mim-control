<script lang="ts">
	import { page } from '$app/state';
	import { getIncidentDetail } from '$lib/api/incident.remote';
	import StrategicHeader from '$lib/components/strategic-header.svelte';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import type { Team } from '$lib/utils/types';

	const incident = await getIncidentDetail(page.params.id!);

	let testTeam = $state<Team>({
		id: '1',
		name: 'Test Team',
		tags: ['Mobile', 'Nginx', 'AWS', 'Azure', 'GCP'],
		members: ['test', 'team'],
		onCall: 'Johan',
		isAdded: false
	});
	let testTeam2 = $state<Team>({
		id: '2',
		name: 'Test Team 2',
		tags: ['Mobile', 'Nginx', 'AWS', 'Azure', 'GCP'],
		members: ['test', 'team'],
		onCall: 'Bart',
		isAdded: false
	});

	let selectedTeams = $state<Team[]>([]);

	function removeTeamFromRoster(team: Team) {
		selectedTeams = selectedTeams.filter((t) => t.id !== team.id);

		// TODO: Have to improve with !
		for (let t of [testTeam, testTeam2]) {
			if (t.id === team.id) {
				t.isAdded = false;
			}
		}
	}
	function addTeamToRoster(team: Team) {
		if (selectedTeams.find((t) => t.id === team.id)) {
			return;
		}

		// Find and update the original team
		for (let t of [testTeam, testTeam2]) {
			if (t.id === team.id) {
				t.isAdded = true;
			}
		}

		selectedTeams.push(team);
	}
</script>

<div class="rounded-xl p-2">
	<StrategicHeader {incident}></StrategicHeader>
	<div class="grid gap-2 rounded-xl md:grid-cols-2">
		<div class="flex flex-col rounded-xl p-4 shadow-sm">
			<section class="flex flex-col gap-2">
				<h2>Proposed Teams:</h2>
				{#each [testTeam, testTeam2] as team}
					{#if !team.isAdded}
						<TeamCard {team} onAdd={addTeamToRoster} onRemove={removeTeamFromRoster}></TeamCard>
					{/if}
				{/each}
			</section>
		</div>

		<div class="flex flex-col rounded-xl p-4 shadow-sm">
			<section>
				<h2>Manual Selection:</h2>
			</section>
		</div>
		{#if selectedTeams.length === 0}
			<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
				<section>
					<h2>No Teams Selected</h2>
				</section>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
				<section>
					<h2>Selected Teams:</h2>
					<div class="justify-evenly gap-2 md:flex md:flex-row">
						{#each selectedTeams as team}
							<TeamCard {team} onRemove={removeTeamFromRoster}></TeamCard>
						{/each}
					</div>
				</section>
			</div>
		{/if}
	</div>
	<div class="flex justify-end">
		<a
			href="/incidents/{incident.id}/mim"
			class="mt-6 rounded-lg bg-button-primary px-6 py-3 font-medium text-background shadow-md transition-opacity hover:opacity-90"
		>
			Start The War-Room
		</a>
	</div>
</div>
