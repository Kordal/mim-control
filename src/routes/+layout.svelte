<script lang="ts">
	import './layout.css';

	import '../app.css';
	import Appbar from '$lib/components/UI/Appbar/Appbar.svelte';
	import { getUser } from '$lib/api/auth.remote';

	let { children } = $props();
	const user = await getUser();
</script>

{#if user?.id}
	<Appbar></Appbar>
{/if}
{@render children()}
