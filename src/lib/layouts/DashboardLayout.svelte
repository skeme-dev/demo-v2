<script>
	import SideNavigation from '$lib/components/dashboard/components/SideNavigation.svelte';
	import TopNavigation from '$lib/components/dashboard/components/TopNavigation.svelte';
</script>

<div class="backend-font w-full h-screen flex bg-[#FCFCFD]">
	<SideNavigation />
	<main class="flex flex-col">
		<TopNavigation />
		<div class="border flex w-full flex-1 bg-white">
			<slot />
		</div>
	</main>
</div>
