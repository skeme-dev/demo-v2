<script>
	import { browser } from '$app/environment';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Carousel from 'svelte-carousel';

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

<Header />
<main class="flex flex-col">
	<div
		class={`relative w-full h-[40vh] bg-img-svkoweg__homepage_image_carousel_pic_1`}
		id="img-carousel"
	>
		<div class="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.4)]" />
		<div
			class="absolute top-1/2 md:left-64 left-8 md:-translate-x-0 -translate-x-4 -translate-y-1/2 space-y-3"
		>
			<h1 class="text-white font-bold md:text-5xl text-4xl mb-12 md:text-left text-center">
				SV-Koweg Görlitz e.V.
			</h1>
			<h2 class="text-white text-2xl font-medium md:text-left text-center">
				Herzlich willkommen auf unserer Internetseite – dem virtuellen Zuhause unseres Vereins!
			</h2>
		</div>
	</div>

	<div class="my-10 flex flex-col md:px-64 px-8 text-2xl">
		<div class="flex flex-col space-y-3">
			<h1 class="font-bold md:text-4xl text-3xl mb-6">Wer wir sind</h1>
			<!-- <h2 class="font-semibold text-3xl">Willkommen auf unseren Internetseiten</h2> -->
			<p class="md:text-xl md:leading-snug text-justify font-semibold">
				Unser Verein wurde 2006 gegründet und ist mit 999 Sporttreibenden einer der größten
				Sportvereine der Region. Unser Sportangebot richtet sich an Sportbegeisterte aller
				Altersklassen. Ob klein oder groß, mit Handicap oder ohne: Wir bringen Menschen in Bewegung!
			</p>
		</div>
		<!-- News Area -->
	</div>
	<div
		class="md:w-screen flex md:flex-col flex-col md:space-x-24 md:px-64 px-8 py-12 bg-[#eee] mt-12"
	>
		<div class="h-full">
			<h1 class="font-bold md:text-4xl text-3xl mb-12">Aktuelles</h1>
		</div>

		<div class="w-full flex h-full">
			<div class="md:flex hidden">
				{#if browser}
					<Carousel particlesToShow={2} dots={false}>
						{#each placeholderBlogPosts as blogPost}
							<div class="">
								<div class="w-[26vw] flex h-fit flex-col space-y-3">
									<div class="w-full h-1/2 bg-green-300">
										<img class="w-full h-full object-cover" src={blogPost.image} alt="" />
									</div>
									<div class="flex space-x-6">
										<p>{blogPost.category}</p>
										<p>|</p>
										<p>{blogPost.uploadedAt}</p>
									</div>
									<h1 class="text-2xl font-semibold mb-3">{blogPost.title}</h1>
									<p class="text-justify font-semibold">{blogPost.previewText}</p>
									<a
										href={blogPost.link}
										class="bg-[rgba(21,26,78)] w-fit px-6 text-white py-3 rounded !mt-6"
										>Weiterlesen</a
									>
								</div>
							</div>
						{/each}
					</Carousel>
				{/if}
			</div>

			<div class="md:hidden flex flex-col w-auto divide-solid space-y-8">
				{#each placeholderBlogPosts as blogPost}
					<div class="flex flex-col pt-8">
						<div class="flex h-fit flex-col">
							<div class="w-full h-fit bg-green-300">
								<img class="w-full h-full object-cover" src={blogPost.image} alt="" />
							</div>
							<div class="flex space-x-3 mt-3">
								<p>{blogPost.category}</p>
								<p>|</p>
								<p>{blogPost.uploadedAt}</p>
							</div>
							<h1 class="text-2xl font-semibold mb-3">{blogPost.title}</h1>
							<p class="text-justify">{blogPost.previewText}</p>
							<a
								href={blogPost.link}
								class="bg-[rgba(21,26,78)] md:w-fit w-full px-6 text-white py-3 rounded !mt-6 text-center"
								>Weiterlesen</a
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>

<Footer />

<style global>
	.bg-img-svkoweg__homepage_image_carousel_pic_1 {
		background-image: url('https://picsum.photos/1800/1000?random=1');
		background-size: cover;
		background-position: center;
	}
</style>
