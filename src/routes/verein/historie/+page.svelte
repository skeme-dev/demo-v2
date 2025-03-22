<script>
	const milestones = [
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			year: '2021',
			title: 'Meileinstein 4',
			description:
				'Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!'
		},
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			year: '2019',
			title: 'Meileinstein 3',
			description:
				'Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!'
		},
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			year: '2017',
			title: 'Meileinstein 2',
			description:
				'Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!'
		},
		{
			imageUrl: 'http://kickebocca.de/assets/verein/historie/verein-historie-triathlon.jpg',
			year: '2015',
			title: 'Meileinstein 1',
			description:
				'Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!Der Verein feiert sein 13 jähriges Bestehen!'
		}
	];
</script>

<div class="w-full flex flex-col space-y-6">
	<h1 class="text-4xl font-bold">Vereinshistorie</h1>
	<h2 class="text-2xl font-semibold text-accent">
		Eine Satzung muss individuell für einen Verein erarbeitet werden. Sie muss auf einen Verein mit
		seinen Organen, seiner Organisation 'zugeschnitten' werden. Ein Verein muss sich seine Satzung
		unter Mitwirkung seiner Gremien erarbeiten.
	</h2>
	<div class="grid grid-cols-2">
		{#each milestones as milestone, index}
			{#if index % 2 == 0}
				<div class="flex flex-col justify-center p-6 border-r-[6px] border-gray-200">
					<h1 class="ml-auto font-bold mb-3 text-2xl">{milestone.year}</h1>
					<p class="text-right">{milestone.description}</p>
				</div>
				<div class="p-6">
					<img src={milestone.imageUrl} alt="" />
				</div>
			{:else}
				<div class="border-r-[6px] border-gray-200 p-6">
					<img src={milestone.imageUrl} alt="" />
				</div>
				<div class="flex flex-col justify-center px-3 pl-6 pb-6">
					<h1 class="mr-auto font-bold mb-3 text-2xl">{milestone.year}</h1>
					<p class="">{milestone.description}</p>
				</div>
			{/if}
		{/each}
	</div>
</div>
