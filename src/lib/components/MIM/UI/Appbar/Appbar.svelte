<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import Icon from '@iconify/svelte';
	import { getUser } from '$lib/api/auth.remote';

	const user = await getUser();
</script>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[1fr_2fr_1fr]">
		<AppBar.Lead>
			<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal">
				<Icon icon="ic:baseline-menu" />
			</button>
		</AppBar.Lead>
		<AppBar.Headline class="text-center">
			<span>MIM Control</span>
		</AppBar.Headline>
		<AppBar.Trail class="ml-auto flex items-center gap-2">
			{#if user?.id}
				<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal">
					<Icon icon="ic:baseline-person" />
				</button>
			{:else}
				<a href="/auth/">Login</a>
			{/if}
			<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal">
				<Icon icon="ic:baseline-settings" />
			</button>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
