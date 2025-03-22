<script>
	const vorstand = [
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			name: 'Maxi Mustermann',
			position: '1. Geschäftsführer',
			email: 'maxi.mustermann@sv-koweg.de'
		},
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			name: 'Max Mustermann',
			position: 'Schatzmeister',
			email: 'max.mustermann@sv-koweg.de'
		}
	];
</script>

<div class="w-full flex flex-col space-y-6">
	<h1 class="text-4xl font-bold">Vorstand</h1>
	<!-- <h2 class="text-2xl font-semibold text-accent">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium necessitatibus pariatur
		eaque tempore aut. Quasi doloremque expedita modi omnis laboriosam iste, ad rerum? Incidunt
		aliquid veritatis quos ducimus earum! Nam, porro! Ducimus voluptatum, corporis aliquam quaerat
		rerum libero atque earum.
	</h2> -->
	<div class="grid grid-cols-2 gap-12">
		{#each vorstand as mitglied, index}
			<div class="flex bg-accent text-white">
				<div class="flex flex-col w-3/4">
					<img src={mitglied.imageUrl} width="285" height="160" alt={'Foto ' + mitglied.name} />
					<div class="flex flex-col p-6">
						<div class="mb-1 text-sm font-medium">{mitglied.position}</div>
						<div class="font-bold text-2xl mb-6">{mitglied.name}</div>
						<div class="underline">
							<a class="font-medium" href={'mailto:' + mitglied.email}>{mitglied.email}</a>
						</div>
					</div>
				</div>
				<!-- <div class="w-1/2"></div> -->
			</div>
		{/each}
	</div>
</div>
