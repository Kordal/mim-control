<script lang="ts">
	type EntryType = 'info' | 'hypothesis' | 'decision' | 'action' | 'status';

	let content = $state('');
	let entryType = $state<EntryType>('info');
	const entryTypes: EntryType[] = ['info', 'hypothesis', 'decision', 'action', 'status'];

	// Quick tags for common labels
	const quickTags = ['Login Issue', 'Database', 'Rollback'];

	function insertTag(tag: string) {
		content += ` [${tag}]`;
	}

	function formatBold() {
		content += '**bold**';
	}

	function formatItalic() {
		content += '*italic*';
	}

	function formatCode() {
		content += '`code`';
	}

	function formatList() {
		content += '\n- ';
	}
</script>

<div class="bg-surface-secondary border-border-primary rounded-lg border">
	<!-- Entry Type Tabs -->
	<div class="border-border-primary flex items-center gap-1 border-b p-2">
		{#each entryTypes as type}
			<button
				class="rounded px-3 py-1.5 text-sm {entryType === type
					? 'bg-blue-600 text-white'
					: 'hover:bg-surface-tertiary text-text-secondary'}"
				onclick={() => (entryType = type)}
			>
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</button>
		{/each}

		<!-- Role selector on right -->
		<div class="ml-auto">
			<span class="text-sm text-text-secondary">As:</span>
			<button class="bg-surface-tertiary ml-2 rounded px-2 py-1 text-sm"> 🤖 Scribe ▾ </button>
		</div>
	</div>

	<!-- Textarea -->
	<div class="relative">
		<textarea
			bind:value={content}
			placeholder="Type log entry details here..."
			rows="4"
			class="w-full resize-none bg-transparent p-4 text-text-primary
             placeholder:text-text-tertiary focus:outline-none"
		></textarea>

		<!-- Formatting toolbar (bottom right of textarea) -->
		<div class="absolute right-2 bottom-2 flex gap-2 text-text-secondary">
			<button onclick={formatBold} class="px-1 hover:text-white">B</button>
			<button onclick={formatItalic} class="px-1 italic hover:text-white">I</button>
			<button onclick={formatCode} class="px-1 font-mono hover:text-white">&lt;&gt;</button>
			<button onclick={formatList} class="px-1 hover:text-white">☰</button>
		</div>
	</div>

	<!-- Footer: Quick Tags + Submit -->
	<div class="border-border-primary flex items-center justify-between border-t p-2">
		<div class="flex items-center gap-2">
			<span class="text-xs text-text-tertiary">Quick Tags:</span>
			{#each quickTags as tag}
				<button
					onclick={() => insertTag(tag)}
					class="border-border-primary hover:bg-surface-tertiary rounded border px-2
                 py-0.5 text-xs"
				>
					+ [{tag}]
				</button>
			{/each}
		</div>

		<div class="flex items-center gap-3">
			<span class="text-xs text-text-tertiary">Draft saved</span>
			<button
				class="rounded bg-green-600 px-4 py-2
                     font-medium text-white hover:bg-green-500"
			>
				Log Entry ▸
			</button>
		</div>
	</div>
</div>
