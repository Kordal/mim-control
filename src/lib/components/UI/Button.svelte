<script>
	import Icon from '@iconify/svelte';
	let { children, icon, action, ...props } = $props();
</script>

<button
	formaction={action}
	{...props}
	class="bg-primary shadow-primary/20 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-600 active:scale-[0.98]"
>
	<span class="material-symbols-outlined fill-1"><Icon {icon} /> {@render children()}</span>
</button>
