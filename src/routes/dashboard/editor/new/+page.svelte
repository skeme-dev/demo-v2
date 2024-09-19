<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';

	export let data: PageData;

	let title: string;
	let author;
</script>

<div class="w-screen h-screen p-64">
	<div class="w-full h-full flex flex-col">
		<div class="relative bg-black text-white w-[36px] h-[36px] font-medium rounded-full">
			<p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">1</p>
		</div>
		<div class="flex flex-col space-y-4 mb-12 pt-6">
			<h1 class="text-3xl font-semibold">Neuen Bericht erstellen</h1>
			<h2 class="text-sm font-medium text-gray-600">Gib einen Titel für den neuen Bericht ein.</h2>
		</div>
		<div class="flex flex-col space-y-4">
			<Label for="title">Titel</Label>

			<Input id="title" class="w-[40%] border-2" name="title" type="text" bind:value={title} />
		</div>
		<div class="ml-auto">
			<Button class="px-12 py-6 mt-12">Weiter</Button>
		</div>
	</div>
</div>
