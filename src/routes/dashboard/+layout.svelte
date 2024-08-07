<script>
	import { page } from '$app/stores';
	import SideNavigation from '$lib/components/dashboard/components/SideNavigation.svelte';
	import TopNavigation from '$lib/components/dashboard/components/TopNavigation.svelte';
	import { currentUser } from '$lib/stores/user';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

	const userStore = writable();
	userStore.set(data.user);

	setContext('user', $userStore);
</script>

<div class="backend-font w-screen h-screen flex bg-[#FCFCFD]">
	{#if $page.url.pathname.includes('editor') || $page.url.pathname.includes('login') || $page.url.pathname.includes('register')}
		<slot />
	{:else}
		<SideNavigation />
		<main class="flex flex-1 flex-col">
			<TopNavigation />
			<div class="border rounded-tl-3xl flex w-full flex-1 bg-white p-12">
				<slot />
			</div>
		</main>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');

	.backend-font > * {
		font-family: 'Poppins', sans-serif !important;
		background-color: #fcfcfd;
	}
</style>
