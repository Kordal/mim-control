<script>
	import { authClient } from '$lib/auth-client';
	import Appbar from '$lib/components/UI/Appbar/Appbar.svelte';
	import IncidentHeader from '$lib/components/UI/IncidentHeader/IncidentHeader.svelte';
	import IncidentTextArea from '$lib/components/UI/IncidentTextArea/IncidentTextArea.svelte';
	import { getUser } from '$lib/api/auth.remote';
	import IncTimeline from '$lib/components/UI/IncTimeline/IncTimeline.svelte';
	import ActionTable from '$lib/components/UI/ActionTable/ActionTable.svelte';

	const user = await getUser();

	async function handleLogout() {
		await authClient.signOut();
		getUser().refresh();
	}
</script>

<Appbar></Appbar>
<div class="grid grid-cols-1 p-4 md:grid-cols-12">
	<div class="hidden md:col-span-2 md:block"></div>
	<div class="md:col-span-8">
		<IncidentHeader></IncidentHeader>
		<IncidentTextArea></IncidentTextArea>
		<div class="flex">
			<IncTimeline></IncTimeline>
			<ActionTable></ActionTable>
		</div>
	</div>
	<div class="hidden md:col-span-2 md:block"></div>
</div>
