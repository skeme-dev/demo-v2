<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Team {
		name: string;
		teamImageUrl: string;
		url: string;
	}

	interface Site {
		label: string;
		url: string;
		teams: Team[];
		show?: boolean;
	}

	export let sitemap: Site[];
	export let label: string;

	sitemap.forEach((obj) => {
		obj = { ...obj, show: false };
	});

	let toggledTeams: number[] = [];

	onMount(() => {
		toggledTeams = [];
	});

	const toggleTeams = (key: number) => {
		if (toggledTeams.includes(key)) {
			toggledTeams.splice(toggledTeams.indexOf(key), 1);
			toggledTeams = toggledTeams;
		} else {
			toggledTeams = [];
			toggledTeams.push(key);
			toggledTeams = toggledTeams;
		}
	};
</script>

<div class="flex flex-col w-full">
	<h1 class="mb-3 font-semibold text-xl">{label}</h1>
	<ul class="divide-y">
		{#each sitemap as item, index}
			<li class="py-2">
				<div class="flex items-center">
					<div class="flex flex-1">
						<a class="text-lg text-gray-500" href={item.url}>{item.label}</a>
					</div>
					<button
						class="p-1 transition-transform duration-500"
						class:rotated={toggledTeams.includes(index)}
						on:click={() => toggleTeams(index)}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.9998 15.5C11.7372 15.5005 11.4771 15.449 11.2345 15.3486C10.9918 15.2483 10.7714 15.1009 10.5858 14.915L5.29285 9.62103L6.70685 8.20703L11.9998 13.5L17.2928 8.20703L18.7068 9.62103L13.4138 14.914C13.2284 15.1001 13.008 15.2476 12.7653 15.3482C12.5227 15.4488 12.2625 15.5004 11.9998 15.5Z"
								fill="#6b7280"
							/>
						</svg>
					</button>
				</div>
				{#if item.teams.length !== 0}
					{#if toggledTeams.includes(index)}
						<ul class="pl-3" transition:slide>
							{#each item.teams as team}
								<li class="py-1">
									<a class=" text-gray-500" href={team.url}>{team.name}</a>
								</li>
							{/each}
						</ul>
					{/if}
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	.rotated {
		transform: rotateZ(180deg);
	}
</style>
