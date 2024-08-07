<script>
	import { onMount } from 'svelte';

	const sponsors = [
		{
			imgUrl: '/KommWohnen.jpg',
			link: 'https://kommwohnen.de'
		},
		{
			imgUrl: '/VGG.jpg',
			link: 'https://vgg-goerlitz.de'
		},
		{
			imgUrl: '/Skan.jpg',
			link: 'https://skan.ch'
		},
		{
			imgUrl: '/Landskron.jpg',
			link: 'https://landskron.de'
		},
		{
			imgUrl: '/Birkenstock.jpg',
			link: 'https://birkenstock-group.com'
		}
	];

	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';

	let carousel; // for calling methods of the carousel instance

	const handleNextClick = () => {
		carousel.goToNext();
	};
</script>

<footer class="flex flex-col">
	<div
		class="flex justify-center md:text-left text-center items-center bg-accent text-white py-6 md:px-0 px-16"
	>
		<div class="flex md:flex-row flex-col md:space-x-24 md:space-y-0 space-y-6">
			<div class="flex flex-col">
				<h1 class="text-2xl mb-1 font-semibold">Geschäftsstelle</h1>
				<div class="flex flex-col">
					<h2>SV Koweg Görlitz e.V.</h2>
					<span>Diesterwegplatz 8</span>
					<span>D-02827 Görlitz</span>
					<p>
						Telefon: (03581)412077
						<br />
						Telefax: (03581)7090020
						<br />
						E-Mail: <a href="mailto:office@sv-koweg.de">office@sv-koweg.de</a>
					</p>
				</div>
			</div>
			<div class="flex flex-col">
				<h1 class="text-2xl mb-1 font-semibold">Direktlinks</h1>
				<div class="flex flex-col">
					<ul class="md:list-disc md:pl-6">
						<li><a href="/sportangebot">Sportangebot</a></li>
						<li><a href="/sportsuche">Sportsuche</a></li>
					</ul>
				</div>
			</div>
			<div class="flex flex-col">
				<h1 class="text-2xl mb-1 font-semibold">Unser Service</h1>
				<div class="flex flex-col">
					<ul class="md:list-disc md:pl-6">
						<li><a href="/service/downloads">Downloads</a></li>
						<li><a href="/service/mitglied-werden">Mitglied werden</a></li>
						<li><a href="/service/beitragsrechner">Beitragsrechner</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div
		class="flex justify-center items-center bg-[#161a4e] text-white py-6 border-t border-b border-white border-dashed"
	>
		<div class="md:max-w-[800px] max-w-full md:px-0 px-6">
			{#if browser}
				<Carousel
					bind:this={carousel}
					particlesToShow={3}
					autoplay
					autoplayDuration={2000}
					swiping={false}
					dots={false}
					arrows={false}
				>
					{#each sponsors as sponsor}
						<div class="">
							<img src={sponsor.imgUrl} alt="" />
						</div>
					{/each}
				</Carousel>
			{/if}
		</div>
	</div>
	<div class="flex justify-center items-center py-6 space-x-6 bg-[#161a4e] text-white">
		<a href="/impressum">Impressum</a>
		<a href="/datenschutz">Datenschutzerklärung</a>
	</div>
	<div class="flex justify-center items-center py-6 space-x-2">
		<span>© {new Date().getFullYear()}</span>
		<span>-</span>
		<span>SV Koweg Görlitz e.V.</span>
	</div>
</footer>
