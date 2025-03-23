<script lang="ts">
	const locations = [
		{
			imageUrl: 'http://kickebocca.de/assets/verein/sportstaetten/verein-sportstaetten-C.jpg',
			title: 'Sportplatz A',
			description:
				'Der Sportplatz A ist ein Rasenplatz mit einer Größe von 100x60m. Er ist mit Flutlichtanlagen ausgestattet.',
			address: 'Musterstraße 1, 12345 Musterstadt'
		},
		{
			imageUrl: 'http://kickebocca.de/assets/verein/sportstaetten/verein-sportstaetten-A.jpg',
			title: 'Sporthalle B',
			description:
				'Der Sporthalle B ist eine Sporthalle mit einer Größe von 100x60m. Er ist mit Flutlichtanlagen ausgestattet.',
			address: 'Musterstraße 3, 12345 Musterstadt'
		}
	];
</script>

<div class="w-full flex flex-col space-y-6">
	<h1 class="text-4xl font-bold">Unsere Sportstätten</h1>
	<h2 class="text-lg text-accent pb-3">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium necessitatibus pariatur
		eaque tempore aut. Quasi doloremque expedita modi omnis laboriosam iste, ad rerum? Incidunt
		aliquid veritatis quos ducimus earum! Nam, porro! Ducimus voluptatum, corporis aliquam quaerat
		rerum libero atque earum.
	</h2>

	{#each locations as location}
		<div class="bg-[#eee]">
			<div class="flex flex-col md:flex-row">
				<div class="flex flex-col py-12 px-8">
					<div class="font-bold text-2xl">{location.title}</div>
					<div class=" my-3 text-sm font-medium">{location.description}</div>
					<div class="">
						<a class="font-semibold" href="/verein/sportstaetten">{location.address}</a>
					</div>
				</div>

				<img src={location.imageUrl} width="285" height="160" alt={'Foto ' + location.title} />
			</div>
		</div>
	{/each}
</div>
