<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full h-full flex flex-col space-y-6">
	<div class="flex flex-col space-y-3">
		<h1 class="text-3xl font-semibold">Dashboard</h1>
		<h3 class="font-medium text-gray-500">Willkommen zurück, {data.user.name}!</h3>
	</div>
	<div class="grid grid-cols-3 grid-rows-1 gap-6">
		<div class="border-2 rounded-lg p-6 flex justify-between items-center space-y-1">
			<!-- <div class="rounded-full bg-black text-white flex justify-center items-center w-12 h-12">
				<i class="ri-user-line" />
			</div> -->
			<h2 class="font-medium text-gray-500 text-sm">Benutzeranzahl</h2>
			<h1 class="font-semibold text-3xl">10</h1>
		</div>
		<div class="border-2 rounded-lg p-6 flex justify-between items-center space-y-1">
			<!-- <div class="rounded-full bg-black text-white flex justify-center items-center w-12 h-12">
				<i class="ri-user-line" />
			</div> -->
			<h2 class="font-medium text-gray-500 text-sm">Neue Anfragen</h2>
			<h1 class="font-semibold text-3xl">5</h1>
		</div>
		<div class="border-2 rounded-lg p-6 flex justify-between items-center space-y-1">
			<!-- <div class="rounded-full bg-black text-white flex justify-center items-center w-12 h-12">
				<i class="ri-user-line" />
			</div> -->
			<h2 class="font-medium text-gray-500 text-sm">Neue Mitgliedschaften</h2>
			<h1 class="font-semibold text-3xl">1000</h1>
		</div>
	</div>
</div>
