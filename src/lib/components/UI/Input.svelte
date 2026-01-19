<script lang="ts">
	let { label, id, type, className, ...value } = $props();
</script>

<div class="flex flex-col px-6 py-2">
	<label class="text-white" for={id}>{label}</label>
	<input
		{...value}
		class="{className} dark:border-border-dark dark:bg-surface-dark w-full rounded-lg border border-gray-200 p-2 dark:text-gray-500"
		{id}
		{type}
	/>
</div>
