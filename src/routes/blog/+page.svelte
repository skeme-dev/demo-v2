<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import slugify from 'slugify';
	import type { PageData } from './$types';

	export let data: PageData;
	const placeholderBlogPosts = [
		{
			uploadedAt: '19.07.2023',
			category: 'Fußball',
			image: 'https://picsum.photos/350/200?random=1',
			title: 'Am Freitag findet das Spitzenspiel gegen Musterclub e.V. statt!',
			previewText:
				'Mit unserem Newsbaustein haben Sie die Möglichkeit, die Besucher Ihrer Internetseite regelmäßig über interessante Neuigkeiten aus Ihrem Verein zu informieren. Weiter test test terst',
			link: '/blog/fußball/am-freitag-findet-das-spitzenspiel-gegen-musterclub-e-V-statt'
		},
		{
			uploadedAt: '19.07.2023',
			category: 'Fußball',
			image: 'https://picsum.photos/350/200?random=2',
			title: 'Am Freitag findet das Spitzenspiel gegen Musterclub e.V. statt!',
			previewText:
				'Mit unserem Newsbaustein haben Sie die Möglichkeit, die Besucher Ihrer Internetseite regelmäßig über interessante Neuigkeiten aus Ihrem Verein zu informieren.',
			link: '/blog/fußball/am-freitag-findet-das-spitzenspiel-gegen-musterclub-e-V-statt'
		},
		{
			uploadedAt: '19.07.2023',
			category: 'Fußball',
			image: 'https://picsum.photos/350/200?random=3',
			title: 'Am Freitag findet das Spitzenspiel gegen Musterclub e.V. statt!',
			previewText:
				'Mit unserem Newsbaustein haben Sie die Möglichkeit, die Besucher Ihrer Internetseite regelmäßig über interessante Neuigkeiten aus Ihrem Verein zu informieren.',
			link: '/blog/fußball/am-freitag-findet-das-spitzenspiel-gegen-musterclub-e-V-statt'
		},
		{
			uploadedAt: '19.07.2023',
			category: 'Fußball',
			image: 'https://picsum.photos/350/200?random=4',
			title: 'Am Freitag findet das Spitzenspiel gegen Musterclub e.V. statt!',
			previewText:
				'Mit unserem Newsbaustein haben Sie die Möglichkeit, die Besucher Ihrer Internetseite regelmäßig über interessante Neuigkeiten aus Ihrem Verein zu informieren.',
			link: '/blog/fußball/am-freitag-findet-das-spitzenspiel-gegen-musterclub-e-V-statt'
		},
		{
			uploadedAt: '19.07.2023',
			category: 'Fußball',
			image: 'https://picsum.photos/350/200?random=5',
			title: 'Am Freitag findet das Spitzenspiel gegen Musterclub e.V. statt!',
			previewText:
				'Mit unserem Newsbaustein haben Sie die Möglichkeit, die Besucher Ihrer Internetseite regelmäßig über interessante Neuigkeiten aus Ihrem Verein zu informieren.',
			link: '/blog/fußball/am-freitag-findet-das-spitzenspiel-gegen-musterclub-e-V-statt'
		}
	];

	const maxDescriptionLength: number = 200;
</script>

<div class="w-screen h-full flex flex-col">
	<Header />
	<main class="px-72 flex flex-col min-w-full">
		<div class="flex flex-col jusitfy-center items-center space-y-3">
			<h1 class="text-3xl font-bold">Unser Blog</h1>
			<h3 class="text-lg">Erfahren Sie mehr über unseren Verein.</h3>
		</div>
		<div class="flex flex-col my-12 space-y-6">
			{#each data?.posts.items as post}
				<a
					href={`/blog/${slugify(post.title)}`}
					class="flex items-center space-x-6 cursor-pointer hover:bg-slate-50 rounded-xl transition-all p-3"
				>
					<div class="max-w-[300px] h-full">
						<!-- Image -->
						<img class="rounded-xl" src={post.imageUrl} alt="" />
					</div>
					<div class="flex flex-col space-y-2">
						<h1 class="text-2xl font-semibold">{post.title}</h1>
						<p>
							{#if post.description.split(' ').join('').length > maxDescriptionLength}
								{post.description.substring(0, maxDescriptionLength)}...
							{:else}
								{post.description}
							{/if}
						</p>
						<p>
							Erstellt am
							<span class="font-medium">
								{new Date(post.created).toLocaleDateString('de-de', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</span>
						</p>
					</div>
				</a>
			{/each}
		</div>
	</main>
</div>
<Footer />
