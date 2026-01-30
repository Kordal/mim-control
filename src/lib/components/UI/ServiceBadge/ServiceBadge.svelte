<script lang="ts">
	let { children } = $props();
</script>

<span class="badge inline-block w-16 truncate preset-filled shadow-lg shadow-neutral-500/20">
	{@render children()}
</span>
