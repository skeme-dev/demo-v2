<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { PageData } from './$types';

	const sponsors = [
		{
			imageUrl: '/Landskron.jpg',
			name: 'Landskron',
			link: ''
		},
		{
			imageUrl: '/Birkenstock.jpg',
			name: 'Birkenstock',
			link: ''
		},
		{
			imageUrl: '/KommWohnen.jpg',
			name: 'KommWohnen',
			link: ''
		},
		{
			imageUrl: '/Skan.jpg',
			name: 'Skan',
			link: ''
		}
	];

	export let data: PageData;

	console.log("DATA from page", data);
</script>

<svelte:head>
	<title>Sponsoren | SV Koweg Görlitz e.V.</title>
</svelte:head>

<div class="w-full flex flex-col space-y-6">
	<h1 class="text-4xl font-bold">Sponsoren</h1>
	<div class="flex flex-col">
		<p class="md:text-left text-justify text-lg">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet vero blanditiis vel quidem ipsa
			magnam esse rerum, tempore molestiae repellat, accusamus ipsam magni nulla atque nobis quam.
			Ad, molestiae voluptates.
		</p>
	</div>

	{#if data.sponsors.filter(s => {
		return s.main_sponsor
	}).length > 0}
		<div class="flex flex-col space-y-6 !mt-12">
		<h1 class="text-3xl font-bold mx-auto">Hauptsponsoren</h1>
		<span class="w-16 h-2 bg-[#eee] mx-auto"></span>
		<div class="grid w-full grid-cols-2 md:grid-cols-4 gap-6">
			{#each data.sponsors.filter(s => {
				return s.main_sponsor
			}) as sponsor}
				<div
					class="flex justify-center items-center p-3 hover:bg-[#eee] transition-all duration-200"
				>
					<a href={sponsor.link} class="">
						<img src={PUBLIC_POCKETBASE_URL + `/api/files/sponsors/${sponsor.id}/${sponsor.logo}`} alt={sponsor.name} />
					</a>
				</div>
			{/each}
		</div>
	</div>
	{/if}
	{#if data.sponsors.filter((s) => {
		return !s.main_sponsor
	}).length > 0}
		<div class="flex flex-col space-y-6 !mt-24">
		<h1 class="text-3xl font-bold mx-auto">Sponsoren und Förderer</h1>
		<span class="w-16 h-2 bg-[#eee] mx-auto"></span>
		<div class="grid w-full grid-cols-2 md:grid-cols-4 gap-6">
			{#each data.sponsors.filter(s => {return !s.main_sponsor}) as sponsor}
				<div
					class="flex justify-center items-center p-3 hover:bg-[#eee] transition-all duration-200"
				>
					<a href={sponsor.link} class="">
						<img src={sponsor.imageUrl} alt={sponsor.name} />
					</a>
				</div>
			{/each}
		</div>
	</div>
	{/if}
</div>
