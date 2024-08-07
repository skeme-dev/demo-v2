<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SiteMap from '$lib/components/SiteMap.svelte';

	export let isBreadcrumbActive: boolean = true;
	export let isSitemapActive: boolean = true;
	export let isEventsActive: boolean = true;

	export let sitemapOptions = {
		label: 'Weitere Seiten',
		sitemapObject: {}
	};

	const events = [
		{
			title: 'Event 1',
			date: new Date('2023-10-2'),
			url: '/events/volleyball/event-1'
		},
		{
			title: 'Event 2',
			date: new Date('2023-10-3'),
			url: '/events/volleyball/event-2'
		},
		{
			title: 'Event 3',
			date: new Date('2023-10-4'),
			url: '/events/volleyball/event-3'
		}
	];

	const sportOffers = [
		{
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
		},
		{
			title: 'Bogensport',
			description:
				'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
			departmentLead: {
				id: '10hr23r',
				name: 'Heinrich Zimmer',
				profilePictureURL: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
				phoneNumber: '+49 1234 5678910',
				email: 'jens.zimmer@sv-koweg.de'
			},
			teams: [
				{
					name: '1. Männermannschaft',
					url: '/sportangebote/bogensport/maenner-1',
					teamImageUrl: 'https://picsum.photos/350/200?random=2'
				},
				{
					name: '1. Frauenmannschaft',
					url: '/sportangebote/bogensport/frauen-1',
					teamImageUrl: 'https://picsum.photos/350/200?random=1'
				}
			]
		},
		{
			title: 'Handball',
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
					url: '/sportangebote/handball/maenner-1',
					teamImageUrl: 'https://picsum.photos/350/200?random=2'
				},
				{
					name: '2. Männermannschaft',
					url: '/sportangebote/handball/maenner-2',
					teamImageUrl: 'https://picsum.photos/350/200?random=1'
				}
			]
		},
		{
			title: 'Kegeln',
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
					url: '/sportangebote/kegeln/maenner-1',
					teamImageUrl: 'https://picsum.photos/350/200?random=2'
				},
				{
					name: '1. Frauenmannschaft',
					url: '/sportangebote/kegeln/frauen-1',
					teamImageUrl: 'https://picsum.photos/350/200?random=1'
				}
			]
		},
		{
			title: 'Tischtennis',
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
					url: '/sportangebote/tischtennis/maenner-1',
					teamImageUrl: 'https://picsum.photos/350/200?random=2'
				},
				{
					name: '1. Frauenmannschaft',
					url: '/sportangebote/tischtennis/frauen-1',
					teamImageUrl: 'https://picsum.photos/350/200?random=1'
				}
			]
		}
	];
	const routes = sportOffers.map((val) => {
		return {
			label: val.title,
			url: '/sportangebote/' + val.title.toLocaleLowerCase(),
			teams: val.teams
		};
	});

	console.log(routes);
</script>

<Header />
<div class="w-full h-[40vh] bg-img" />
<main class="md:px-64 px-8 py-12 flex flex-col">
	{#if isBreadcrumbActive}
		<Breadcrumb />
	{/if}
	<div class="flex {isSitemapActive && isEventsActive ? 'md:space-x-12' : 'space-x-0'}">
		<div
			class="{isSitemapActive && isEventsActive
				? 'md:flex'
				: 'hidden'} hidden flex-col w-1/4 space-y-24"
		>
			{#if isSitemapActive}
				<SiteMap label={sitemapOptions.label} sitemap={routes} />
			{/if}
			{#if isEventsActive}
				<div class="flex flex-col">
					<h1 class="text-xl font-semibold mb-3">Aktuelle Events</h1>
					<div class="flex flex-col divide-y">
						{#each events as event}
							<a href={event.url} class="text-lg py-3">
								<span class="mr-2 text-base">{event.date.toLocaleDateString()}:</span>
								<span class="font-semibold">{event.title}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
		<slot />
	</div>
</main>
<Footer />

<style>
	.bg-img {
		background-image: url('https://picsum.photos/1800/500?random=1');
		background-size: cover;
		background-position: center;
	}
</style>
