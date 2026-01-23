<script>
	import { getUser } from '$lib/api/auth.remote';

	import { authClient } from '$lib/auth-client';
	import Searchdropdown from '$lib/components/Searchdropdown.svelte';

	const user = await getUser();

	async function handleLogout() {
		await authClient.signOut();
		getUser().refresh();
	}
</script>

<div>
	{#if user}
		<div class="gap4 flex flex-col">
			<p>Logged in as {user.name}</p>
			<a href="/incidents/new">Start INC</a>
			<a href="/incidents/c31e3f6b-c561-415c-9156-2cbfa662d605/mim">Test INC</a>
			<button onclick={handleLogout}>Log off</button>
		</div>
	{:else}
		<p>Not logged in</p>
		<a href="/auth">Login</a>
	{/if}
</div>

<Searchdropdown></Searchdropdown>
