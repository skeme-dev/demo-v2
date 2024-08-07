<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import PersonCard from '$lib/components/PersonCard.svelte';

	const sportTeam = $page.params.sportTeam;

	export let data: PageData;

	const team = {
		name: '1. Männermannschaft',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quibusdam officia quae? Dolore, quas sequi?',
		persons: [
			{
				name: 'Hans Schmidt',
				position: 'Trainer',
				email: 'hans.schmidt@sv-koweg.de',
				imageUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
				phone: '+4912345678910'
			},
			{
				name: 'Hanna Schmidt',
				position: 'Trainer',
				email: 'hanna.schmidt@sv-koweg.de',
				imageUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
				phone: '+4912345678910'
			}
		],
		location: {
			imageUrl: 'https://picsum.photos/350/200?random=3',
			name: 'Stadion 1',
			address: 'Hauptstraße 1, 02826 Görlitz'
		}
	};

	const blogPostsPreviews = [
		{
			category: 'Volleyball',
			uploadedAt: new Date('2023-09-07'),
			title: 'Test Blog Post 1',
			image: 'https://picsum.photos/350/200?random=3',
			url: '/news/volleyball/test-blog-post-1',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus quibusdam officia error distinctio, sed quam dolores reprehenderit pariatur velit consectetur.'
		},
		{
			category: 'Volleyball',
			uploadedAt: new Date('2023-09-08'),
			title: 'Test Blog Post 2',
			image: 'https://picsum.photos/350/200?random=4',
			url: '/news/volleyball/test-blog-post-2',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus quibusdam officia error distinctio, sed quam dolores reprehenderit pariatur velit consectetur.'
		},
		{
			category: 'Volleyball',
			uploadedAt: new Date('2023-09-09'),
			title: 'Test Blog Post 3',
			image: 'https://picsum.photos/350/200?random=5',
			url: '/news/volleyball/test-blog-post-3',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus quibusdam officia error distinctio, sed quam dolores reprehenderit pariatur velit consectetur.'
		}
	];
</script>

<div class="flex flex-col space-y-16">
	<div class="flex flex-col space-y-6">
		<h1 class="text-4xl font-bold">{team.name}</h1>
		<p class="text-lg">{team.description}</p>
	</div>
	<div class="flex flex-col space-y-6">
		<h2 class="text-2xl font-semibold">Ansprechpartner</h2>
		<div class="flex md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-12">
			{#each team.persons as person}
				<PersonCard data={person} />
			{/each}
		</div>
	</div>
	<div class="flex flex-col space-y-6 md:!mb-12">
		<h2 class="text-2xl font-semibold">Trainingszeiten</h2>
		<div class="flex flex-col md:space-y-0 space-y-6">
			<div class="relative flex bg-[#eee] p-6 md:w-1/2">
				<div class="flex flex-1 flex-col space-y-3">
					<h1 class="text-2xl font-semibold">Montag</h1>
					<span class="text-lg">16:00 - 17:00 Uhr</span>
					<a
						href="https://maps.app.goo.gl/Ntgug5EaiXxHShVH8"
						class="w-fit group transition duration-300 text-lg font-semibold"
						>Allianz Arena
						<!-- <svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14.5358 11.5357L14.5358 5.46452C14.5357 4.93419 14.325 4.42561 13.95 4.05061C13.575 3.67561 13.0664 3.4649 12.5361 3.46482L6.46488 3.46482L6.46488 5.46452L11.1219 5.46452L3.34371 13.2427L4.75792 14.6569L12.5361 6.87873L12.5361 11.5357L14.5358 11.5357Z"
									fill="#000"
								/>
							</svg> -->
						<span
							class="w-full block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"
						/>
					</a>
				</div>
				<div class="">
					<svg
						class=""
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_945_1108)">
							<circle cx="12" cy="12" r="11" stroke="black" stroke-width="2" />
							<path
								d="M12.0112 7L12 12.6361"
								stroke="black"
								stroke-width="2"
								stroke-linecap="round"
							/>
							<path d="M15 16L12 13" stroke="black" stroke-width="2" stroke-linecap="round" />
							<rect x="11" y="9" width="1" height="4" fill="black" />
						</g>
						<defs>
							<clipPath id="clip0_945_1108">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full flex flex-col space-y-6 md:!mb-12">
		<h2 class="text-2xl font-semibold">Die Mannschaft</h2>
		<img
			class="w-full"
			src="https://www.sgplatjenwerbe.de/_cache/images/cms/Veranstaltungen/.eea67c2ad402cb506bbdc8e4ee68c166/U15.jpg"
			alt=""
		/>
	</div>
	<div class="flex flex-col space-y-6">
		<h2 class="text-2xl font-semibold">Mannschaftsberichte</h2>
		<div class="flex flex-col md:space-y-0 space-y-6 md:grid grids-cols-3-1-3 md:gap-6 md:divide-y">
			{#each blogPostsPreviews as preview}
				<div class="flex flex-col my-1 bg-[#eee]">
					<div class="w-full">
						<img class="w-full" src={preview.image} alt="" />
					</div>
					<div class="flex flex-col p-6">
						<div class="flex pt-1 space-x-3 items-center">
							<span>{preview.category}</span>
							<span>|</span>
							<span>Hochgeladen am {preview.uploadedAt.toLocaleDateString()}</span>
						</div>
						<a href={preview.url} class="mt-1 text-xl">{preview.title}</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.grids-cols-3-1-3 {
		grid-template-columns: repeat(3, minmax(0, 33.333333%));
	}
</style>
