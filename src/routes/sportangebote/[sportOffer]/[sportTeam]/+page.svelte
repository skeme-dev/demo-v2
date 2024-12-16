<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import PersonCard from '$lib/components/PersonCard.svelte';
	import { getImageUrl } from '$lib';

	const sportTeam = $page.params.sportTeam;

	export let data: PageData;

	function f(date: string) {
		const d = new Date(date);

		return d.toLocaleDateString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	function sortWeekdays(array) {
		const germanWeekdaysOrder = [
			"Montag",
			"Dienstag",
			"Mittwoch",
			"Donnerstag",
			"Freitag",
			"Samstag",
			"Sonntag"
		];

		// Sort the input array of objects based on the correct order of the weekday property
		return array.sort((a, b) => {
			const indexA = germanWeekdaysOrder.indexOf(a.day);
			const indexB = germanWeekdaysOrder.indexOf(b.day);
			return indexA - indexB;
		});
	}

</script>

<div class="flex flex-col space-y-12">
	<div class="flex flex-col space-y-6">
		<h1 class="text-4xl font-bold">{data.team.title}</h1>
		<p class="text-lg">{data.team.description}</p>
	</div>
	<div class="flex flex-col space-y-6">
		<h2 class="text-2xl font-semibold">Ansprechpartner</h2>
		<div class="flex md:w-full md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-12">
			{#each data.team.expand.trainers as person}
				<PersonCard data={person} />
			{/each}
		</div>
	</div>
	<div class="flex flex-col space-y-6">
		<h2 class="text-2xl font-semibold">Trainingszeiten</h2>
		<div class="grid gap-6 grid-cols-2">


		{#each sortWeekdays(data.team.expand.training_schedule) as schedule}
			<div class="flex flex-col md:space-y-0 w-full">
				<div class="relative flex bg-[#eee] p-6 md:w-full">
					<div class="flex flex-1 flex-col space-y-3">
						<h1 class="text-2xl font-semibold">{schedule.day}</h1>
						<span class="text-lg">{schedule.start} - {schedule.end} Uhr</span>
						<a
							href={schedule.location_url}
							class="w-fit group transition duration-300 text-lg font-semibold"
							>{schedule.location_label}
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
		{/each}
		</div>
		</div>
	<div class="w-full flex flex-col space-y-6">
		<h2 class="text-2xl font-semibold">Die Mannschaft</h2>
		<img class="w-full" src={getImageUrl(data.team.id, data.team.team_image)} alt="" />
	</div>
	<div class="">
	{#if data.team.relatedPosts.length > 0}
		<div class="flex flex-col space-y-6">
			<h2 class="text-2xl font-semibold">Mannschaftsberichte</h2>
			<div class="flex flex-col md:space-y-0 space-y-6 md:grid grids-cols-3-1-3 md:gap-6 md:divide-y">
				{#each data.team.expand.relatedPosts as post}
					<div class="w-full flex flex-col my-1 bg-[#eee]">
						<div class="w-full">
							<img class="w-full" src={post.image} alt="" />
						</div>
						<div class="flex flex-col p-6">
							<div class="flex pt-1 space-x-3 items-center">
								<span>Hochgeladen am {f(post.updated)}</span>
							</div>
							<a href={"/posts/" + post.slug} class="mt-1 text-xl font-medium">{post.title}</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	</div>
</div>

<style>
	.grids-cols-3-1-3 {
		grid-template-columns: repeat(2, minmax(0, 50%));
	}
</style>
