<script>
	import { authClient } from '$lib/auth-client';
	import Appbar from '$lib/components/UI/Appbar/Appbar.svelte';
	import IncidentHeader from '$lib/components/UI/IncidentHeader/IncidentHeader.svelte';
	import IncidentTextArea from '$lib/components/UI/IncidentTextArea/IncidentTextArea.svelte';
	import { getUser } from '$lib/api/auth.remote';
	import IncTimeline from '$lib/components/UI/IncTimeline/IncTimeline.svelte';
	import ActionTable from '$lib/components/UI/ActionTable/ActionTable.svelte';
	import PresentPeopleCard from '$lib/components/UI/PresentPeopleCard/PresentPeopleCard.svelte';
	import ReportedImpact from '$lib/components/UI/ReportedImpact/ReportedImpact.svelte';
	import LiveLog from '$lib/components/UI/LiveLog/LiveLog.svelte';

	const user = await getUser();

	async function handleLogout() {
		await authClient.signOut();
		getUser().refresh();
	}
</script>

<Appbar></Appbar>
<div class="grid grid-cols-1 p-4 md:grid-cols-12">
	<div class="hidden md:col-span-3 md:block">
		<PresentPeopleCard></PresentPeopleCard>
	</div>
	<div class="md:col-span-6">
		<IncidentHeader></IncidentHeader>
		<IncidentTextArea></IncidentTextArea>
		<ReportedImpact></ReportedImpact>
		<div class="flex">
			<IncTimeline></IncTimeline>
			<ActionTable></ActionTable>
		</div>
	</div>
	<div class="hidden md:col-span-3 md:block">
		<LiveLog></LiveLog>
	</div>
</div>
