<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const sportOffer = $page.params.sportOffer;

	const sportOffersObject = {
		title: 'Volleyball',
		description:
			'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
		departmentLead: {
			id: '10hr23r',
			name: 'Jens Zimmer',
			profilePictureURL: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
			phoneNumber: '+49 1234 5678910',
			email: 'jens.zimmer@sv-koweg.de'
		},
		teams: [
			{
				name: '1. Männermannschaft',
				url: '/sportangebote/volleyball/maenner-1',
				teamImageUrl: 'https://picsum.photos/350/200?random=2'
			},
			{
				name: '1. Frauenmannschaft',
				url: '/sportangebote/volleyball/frauen-1',
				teamImageUrl: 'https://picsum.photos/350/200?random=1'
			}
		]
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

	const events = [
		{
			title: 'Event 1',
			date: new Date('2023-10-2'),
			url: '/events/volleyball/event-1'
		}
	];

	const pageContentToSpeech = () => {
		let utterance = new SpeechSynthesisUtterance();
		utterance.text = 'Volleyball';
		utterance.lang = 'de';
		window.speechSynthesis.speak(utterance);
	};

	export let data;

	console.log(data);
</script>

<div class="flex flex-col space-y-3">
	<button class="w-fit mb-3" on:click={pageContentToSpeech}>Seite vorlesen</button>
	<div class="flex flex-col space-y-12">
		<div class="flex flex-col space-y-6">
			<h1 class="text-4xl font-bold">{data.record.label}</h1>
			<p class="text-lg">{data.record.description}</p>
			<div class="flex bg-accent text-white p-6 md:w-fit w-full md:flex-row space-x-6 rounded">
				<div class="flex justify-center items-center md:w-1/5 w-20">
					<img
						class="rounded"
						src={sportOffersObject.departmentLead.profilePictureURL}
						alt={'Profilbild von ' + sportOffersObject.departmentLead.name}
					/>
				</div>
				<div class="flex flex-col space-y-2">
					<h3 class="text-xl font-semibold">{data?.record.expand.leader.name}</h3>
					<span>Abteilungsleiter</span>
					<div class="flex flex-col">
						<span>{data?.record.expand.leader.phoneNumber}</span>
						<span>{data?.record.expand.leader.email}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col space-y-6">
			<h2 class="text-2xl font-semibold">Unsere Mannschaften</h2>
			<div class="flex md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-12">
				{#each sportOffersObject.teams as team}
					<div class="bg-[#161a4e] text-white rounded">
						<div class="max-w-1/2 h-fit">
							<img class="rounded-t" src={team.teamImageUrl} alt="" />
						</div>
						<div class="p-6 flex justify-center items-center">
							<a href={team.url} class="text-center font-medium text-xl">
								{team.name}
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex flex-col space-y-6">
			<h2 class="text-2xl font-semibold">Aktuelles</h2>
			<div class="grid grids-cols-3-1-3 gap-6 divide-y">
				{#each blogPostsPreviews as preview}
					<div class="flex flex-col my-1 bg-[#eee]">
						<div class="w-full">
							<img src={preview.image} alt="" />
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
</div>

<style>
	.grids-cols-3-1-3 {
		grid-template-columns: repeat(3, minmax(0, 33.333333%));
	}
</style>
