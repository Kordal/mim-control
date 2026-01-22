<script lang="ts">
	import { login, signup } from '$lib/api/auth.remote';

	let action: 'Login' | 'Signup' = $state('Login');

	let func = $derived.by(() => (action === 'Login' ? login : signup));
</script>

<section class="flex h-screen items-center justify-center">
	<div class="rounded-lg bg-background-panel p-6 md:w-[400px]">
		<h1 class="mb-6 text-2xl font-bold">{action === 'Login' ? 'Welcome Back' : 'Welcome'}</h1>
		<form {...func} class="flex flex-col gap-4">
			{#if action === 'Signup'}
				<label for="name"> Name: </label>
				<input
					id="name"
					{...signup.fields.name.as('text')}
					class="border-DEFAULT border-subtle rounded-lg border"
				/>
				{#each signup.fields.name.issues() as issue}
					<p class="text-status-critical">{issue.message}</p>
				{/each}
			{/if}
			<label for="email"> Email: </label>

			<input
				id="email"
				{...func.fields.email.as('text')}
				class="border-DEFAULT border-subtle rounded-lg border"
			/>
			{#each func.fields.email.issues() as issue}
				<p class="text-status-critical">{issue.message}</p>
			{/each}
			<label for="password"> Password: </label>
			<input
				id="password"
				{...func.fields.password.as('text')}
				class="border-DEFAULT border-subtle rounded-lg border"
			/>
			{#each func.fields.password.issues() as issue}
				<p class="text-status-critical">{issue.message}</p>
			{/each}
			<div class="ml-auto inline-block p-4">
				<button class="rounded-lg bg-button-primary p-2 text-text-primary">{action}</button>
			</div>
		</form>
		<button
			class="mt-4 ml-auto block text-text-secondary"
			onclick={() => (action = action === 'Login' ? 'Signup' : 'Login')}
		>
			{action === 'Login' ? 'I dont have an account' : 'login'}
		</button>
	</div>
</section>
