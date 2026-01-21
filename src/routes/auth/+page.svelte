<script lang="ts">
	import { login, signup } from '$lib/api/auth.remote';

	let action: 'login' | 'signup' = $state('login');

	let func = $derived.by(() => (action === 'login' ? login : signup));
</script>

<section>
	<div class="bg-background-panel">
		<form {...func} class="flex flex-col gap-4 p-4">
			{#if action === 'signup'}
				<label for="name"> Name: </label>
				<input
					id="name"
					{...signup.fields.name.as('text')}
					class="border-DEFAULT border-subtle rounded-md border"
				/>
				{#each signup.fields.name.issues() as issue}
					<p class="text-status-critical">{issue.message}</p>
				{/each}
			{/if}
			<label for="email"> Email: </label>

			<input
				id="email"
				{...func.fields.email.as('text')}
				class="border-DEFAULT border-subtle rounded-md border"
			/>
			{#each func.fields.email.issues() as issue}
				<p class="text-status-critical">{issue.message}</p>
			{/each}
			<label for="password"> Password: </label>
			<input
				id="password"
				{...func.fields.password.as('text')}
				class="border-DEFAULT border-subtle rounded-md border"
			/>
			{#each func.fields.password.issues() as issue}
				<p class="text-status-critical">{issue.message}</p>
			{/each}
			<div class="ml-auto inline-block p-4">
				<button class="rounded-md bg-button-primary p-2 text-text-primary">{action}</button>
			</div>
		</form>
		<button onclick={() => (action = action === 'login' ? 'signup' : 'login')}>
			Switch to {action === 'login' ? 'signup' : 'login'}
		</button>
	</div>
</section>
