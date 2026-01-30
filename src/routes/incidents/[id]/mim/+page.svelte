<script lang="ts">
	import { page } from '$app/state';
	import { getIncidentDetail } from '$lib/api/incident.remote';
	import StrategicHeader from '$lib/components/strategic-header.svelte';
	import TextArea from '$lib/components/text-area.svelte';

	const incident = await getIncidentDetail(page.params.id!);
</script>

{#if incident}
	<StrategicHeader {incident} />
{:else}
	<h1>Incident not found</h1>
	<p>The incident with ID {page.params.id} does not exist.</p>
{/if}

<TextArea></TextArea>
