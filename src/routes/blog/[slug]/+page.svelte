<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { generateHTML } from '@tiptap/core';
	import type { PageData } from './$types';
	import Link from '@tiptap/extension-link';
	import Underline from '@tiptap/extension-underline';
	import StarterKit from '@tiptap/starter-kit';
	import { browser } from '$app/environment';

	export let data: PageData;

	console.log(data.record);

	if (data.errorCode) {
		console.log('Kein Bericht gefunden');
	}

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
</script>

<div class="w-screen h-full flex flex-col">
	<Header />
	<header class="w-screen space-y-12 h-full pt-6 md:pt-20 px-6 md:px-36 flex flex-col">
		<div class="flex flex-col justify-center items-center space-y-3 text-center">
			<h1 class="text-4xl font-bold">
				{data.record?.title}
			</h1>
			<p class="text-lg font-medium">Von {data.record?.expand?.author.name}</p>
		</div>
		<div class="w-full bg-red-300 h-[75vh] rounded-xl">
			<img class="h-full w-full rounded-xl" src={data.record?.imageUrl} alt="" />
		</div>
	</header>
	<main class="px-6 md:px-36 py-12 text-justify font-medium leading-relaxed text-lg">
		<!-- <button
			class="ml-auto mb-6 pl-8 text-base pr-10 py-3 bg-[#eee] text-black rounded font-medium w-fit flex items-center space-x-2"
			>Per Link Teilen</button
		> -->
		<div class="mb-6">
			<p>
				{data.record?.description}
			</p>
			<p>
				{#if browser}
					{@html generateHTML(data.record?.content, [StarterKit, Underline, Link])}
				{/if}
			</p>
		</div>
		<hr />
		<div class="flex justify-between mt-6 pb-12">
			<p>Geschrieben von <span class="font-semibold">{data.record?.expand?.author.name}</span></p>
			<p>
				Hochgeladen am <span class="font-semibold"
					>{new Date(data.record?.created).toLocaleDateString('de-de', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</span
				>
			</p>
		</div>
	</main>
	<footer class="flex flex-col px-36 pb-24 bg-[#eee]">
		<div class="flex justify-center flex-col w-full py-12">
			<h1 class="text-center text-3xl font-semibold">
				Lies weitere Berichte aus unseren Abteilungen
			</h1>
		</div>
		<div class="grid grid-cols-3 gap-12">
			{#each placeholderBlogPosts as blogPost}
				<div class="">
					<div class="w-[26vw] flex h-fit flex-col space-y-1">
						<div class="w-full h-1/2 bg-green-300">
							<img class="w-full h-full object-cover" src={blogPost.image} alt="" />
						</div>
						<div class="flex space-x-6 !mt-2">
							<p>{blogPost.category}</p>
							<p>|</p>
							<p>{blogPost.uploadedAt}</p>
						</div>
						<h1 class="text-2xl font-semibold mb-2">{blogPost.title}</h1>
						<!-- <p class="text-justify font-semibold">{blogPost.previewText}</p> -->
						<a
							href={blogPost.link}
							class="bg-[rgba(21,26,78)] w-fit px-6 text-white py-3 rounded !mt-6">Weiterlesen</a
						>
					</div>
				</div>
			{/each}
		</div>
	</footer>
</div>
<Footer />
