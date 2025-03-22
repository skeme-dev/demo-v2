<script lang="ts">
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
</script>

<div class="w-full flex flex-col space-y-6">
	<h1 class="text-4xl font-bold">Sponsoren</h1>
	<div class="flex flex-col">
		<p class="md:text-left text-justify text-lg">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet vero blanditiis vel quidem ipsa
			magnam esse rerum, tempore molestiae repellat, accusamus ipsam magni nulla atque nobis quam.
			Ad, molestiae voluptates.
		</p>
	</div>

	<div class="grid w-full grid-cols-2 md:grid-cols-4 gap-6">
		{#each sponsors as sponsor}
			<div class="flex justify-center items-center p-3 hover:bg-[#eee] transition-all duration-200">
				<a href={sponsor.link} class="">
					<img src={sponsor.imageUrl} alt={sponsor.name} />
				</a>
			</div>
		{/each}
	</div>
</div>
