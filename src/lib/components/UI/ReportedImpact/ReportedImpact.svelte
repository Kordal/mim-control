<script lang="ts">
	import Icon from '@iconify/svelte';

	// Service-specific impact data with flexible metrics
	let serviceImpacts = $state([
		{
			service: 'Web Application',
			availability: 0,
			impactLevel: 'critical',
			startTime: '13:45',
			reportedBy: 'John Doe',
			metric: {
				value: 892,
				label: 'Affected Users'
			}
		},
		{
			service: 'Mobile App',
			availability: 20,
			impactLevel: 'high',
			startTime: '14:02',
			reportedBy: 'Jane Smith',
			metric: {
				value: 245,
				label: 'Users Unable to Login'
			}
		},
		{
			service: 'API Gateway',
			availability: 45,
			impactLevel: 'medium',
			startTime: '14:15',
			reportedBy: 'Monitoring System',
			metric: {
				value: 15420,
				label: 'API Calls Failed'
			}
		},
		{
			service: 'Payment Service',
			availability: 100,
			impactLevel: 'none',
			startTime: null,
			reportedBy: null,
			metric: null
		}
	]);

	function getImpactClass(availability: number, prefix: 'text' | 'bg') {
		const suffix = '-500';

		if (availability === 0) return `${prefix}-error${suffix}`;
		if (availability < 50) return `${prefix}-warning${suffix}`;
		if (availability < 100) return `${prefix}-warning-400`;
		return `${prefix}-success${suffix}`;
	}

	function getImpactText(availability: number) {
		if (availability === 0) return '100% Unavailable';
		if (availability === 100) return 'Fully Available';
		return `${100 - availability}% Unavailable`;
	}
</script>

<div class="mt-2 card preset-filled-surface-100-900 p-4 text-start shadow-md shadow-surface-500/50">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-lg font-semibold">Reported Impact</h2>
	</div>

	<!-- Service Impact List -->
	<div class="flex flex-col gap-3">
		{#each serviceImpacts as service}
			<div class="card preset-filled-surface-200-800 p-4">
				<div class="flex items-start justify-between gap-4">
					<!-- Left: Service Info -->
					<div class="flex flex-1 items-start gap-3">
						<div class="flex-1">
							<div class="mb-1 flex items-center gap-2">
								<h3 class="font-semibold text-text-primary">{service.service}</h3>
								<span
									class="rounded-full {getImpactClass(
										service.availability,
										'bg'
									)} px-2 py-0.5 text-xs font-medium text-white"
								>
									{getImpactText(service.availability)}
								</span>
							</div>

							<!-- Availability Bar -->
							<div class="mb-2 h-2 w-full rounded-full bg-surface-400">
								<div
									class="h-full rounded-full transition-all {service.availability > 0
										? 'bg-success-500'
										: 'bg-error-500'}"
									style="width: {service.availability}%"
								></div>
							</div>

							<!-- Additional Info -->
							<div class="flex flex-wrap gap-4 text-xs text-text-secondary">
								{#if service.startTime}
									<div class="flex items-center gap-1">
										<Icon icon="ic:outline-timer" />
										<span>Started: {service.startTime}</span>
									</div>
								{/if}
								{#if service.reportedBy}
									<div class="flex items-center gap-1">
										<Icon icon="ic:baseline-person" />
										<span>Reported by: {service.reportedBy}</span>
									</div>
								{/if}
								{#if service.metric}
									<div class="flex items-center gap-1">
										<span>{service.metric.value.toLocaleString()} {service.metric.label}</span>
									</div>
								{/if}
								{#if service.availability === 100}
									<div class="flex items-center gap-1">
										<Icon icon="ic:baseline-check-circle" class="text-success-500" />
										<span class="text-success-500">Operational</span>
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Right: Availability Percentage -->
					<div class="text-right">
						<p class="text-2xl font-bold {getImpactClass(service.availability, 'text')}">
							{service.availability}%
						</p>
						<p class="text-xs text-text-secondary">Available</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
