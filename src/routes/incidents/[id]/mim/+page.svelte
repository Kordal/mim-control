<script>
	import IncidentHeader from '$lib/components/MIM/UI/IncidentHeader/IncidentHeader.svelte';
	import IncidentTextArea from '$lib/components/MIM/UI/IncidentTextArea/IncidentTextArea.svelte';
	import IncTimeline from '$lib/components/MIM/UI/IncTimeline/IncTimeline.svelte';
	import ActionTable from '$lib/components/MIM/UI/ActionTable/ActionTable.svelte';
	import PresentPeopleCard from '$lib/components/MIM/UI/PresentPeopleCard/PresentPeopleCard.svelte';
	import ReportedImpact from '$lib/components/MIM/UI/ReportedImpact/ReportedImpact.svelte';
	import LiveLog from '$lib/components/MIM/UI/LiveLog/LiveLog.svelte';
	import LiveLog2 from '$lib/components/MIM/UI/LiveLog/LiveLog2.svelte';
</script>

<div class="grid grid-cols-1 p-4 md:grid-cols-12">
	<div class="hidden md:col-span-3 md:block">
		<PresentPeopleCard></PresentPeopleCard>
	</div>
	<div class="md:col-span-6">
		<IncidentHeader></IncidentHeader>
		<IncidentTextArea></IncidentTextArea>
		<ReportedImpact></ReportedImpact>
		<div class="flex">
			<ActionTable></ActionTable>
		</div>
		<!-- <IncTimeline></IncTimeline> -->
	</div>
	<div class="hidden md:col-span-3 md:block">
		<LiveLog2></LiveLog2>
	</div>
</div>
