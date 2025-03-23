<script>
	const vorstand = [
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			name: 'Maxi Mustermann',
			position: '1. Geschäftsführer',
			email: 'maxi.mustermann@sv-koweg.de',
			tel: '+49 123 452032'
		},
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			name: 'Max Mustermann',
			position: 'Schatzmeister',
			email: 'max.mustermann@sv-koweg.de',
			tel: '+49 123 452031'
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
	<div class="grid gap-12">
		{#each vorstand as mitglied, index}
			<div class="flex w-full bg-accent text-white">
				<div class="flex flex-col w-full">
					<img
						class="ml-auto"
						src={mitglied.imageUrl}
						width="350"
						height="160"
						alt={'Foto ' + mitglied.name}
					/>
					<div class="flex flex-col p-12">
						<div class="mb-2">{mitglied.position}</div>
						<div class="font-bold text-3xl mb-6">{mitglied.name}</div>
						<div class="underline">
							<a class="font-medium" href={'mailto:' + mitglied.email}>{mitglied.email}</a>
						</div>
						<div class="underline">
							<a class="font-medium" href={'tel:' + mitglied.tel}>{mitglied.tel}</a>
						</div>
					</div>
				</div>
				<!-- <div class="w-1/2"></div> -->
			</div>
		{/each}
	</div>
</div>
