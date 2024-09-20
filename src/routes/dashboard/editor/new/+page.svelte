<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import Editor2 from '$lib/components/dashboard/components/editor/Editor2.svelte';
	import { fade, slide } from 'svelte/transition';
	import Dialog from '$lib/components/dashboard/components/Dialog.svelte';

	export let data: PageData;

	let title: string = 'Test title';
	let author;

	let publishToday = true;
	let publishTime = '';
	let fileInput;
	let fileHandle;
	let cropDialogOpen = false;
	let file: File;
	let fileUrl: string;

	const pickerOptions = {
		types: [
			{
				description: 'Images',
				accept: {
					'image/*': ['.png', '.gif', '.jpeg', '.jpg']
				}
			}
		],
		excludeAcceptAllOption: true,
		multiple: false
	};

	async function getImage() {
		try {
			[fileHandle] = await window.showOpenFilePicker(pickerOptions);
		} catch (error) {
			if (error.name == 'AbortError') return;
			alert('Auf die lokalen Dateien kann nicht zugegriffen werden.');
			console.error(error);
		}

		try {
			file = await fileHandle.getFile();
		} catch (error) {
			alert(
				'Ein Fehler ist beim Hochladen des Bildes aufgetreten. Der Fehler ist in der Konsole sichtbar.'
			);
			console.error(error);

			// open crop dialog
		}
		// cropDialogOpen = true;

		if (file) {
			fileUrl = URL.createObjectURL(file);
		}
	}
</script>

<div class="bg-white flex flex-col w-screen h-fit">
	<div class="w-screen h-screen p-64">
		<div class="w-full h-max flex flex-col">
			<div
				class="w-[36px] h-[36px] text-white bg-black flex justify-center items-center rounded-full mb-6"
			>
				1
			</div>
			<div class="flex flex-col space-y-4 mb-12">
				<h1 class="text-3xl font-semibold">Neuen Bericht erstellen</h1>
				<h2 class="text-sm font-medium text-gray-600">
					Gib einen Titel für den neuen Bericht ein.
				</h2>
			</div>
			<div class="flex flex-col space-y-4">
				<Label for="title">Titel</Label>

				<Input id="title" class="w-[40%] border-2" name="title" type="text" bind:value={title} />
			</div>
			<div class="ml-auto">
				<Button class="px-6 mt-6">Weiter</Button>
			</div>
		</div>
	</div>
	<div class="w-screen h-screen px-64 py-32">
		<div class="w-full h-max flex flex-col">
			<div
				class="w-[36px] h-[36px] text-white bg-black flex justify-center items-center rounded-full mb-6"
			>
				2
			</div>
			<div class="flex flex-col space-y-4 mb-12">
				<h1 class="text-3xl font-semibold">Inhalt einfügen</h1>
				<h2 class="text-sm font-medium text-gray-600">
					Schreibe den passenden Inhalt zu deinem Bericht.
				</h2>
				<div class="w-full flex justify-start items-center pt-12 pb-6">
					<div class="w-full font-semibold text-xl text-center">
						<input type="text" bind:value={title} class="w-full focus:outline-none" />
					</div>
				</div>
				<!-- <hr class="pt-6" /> -->
				<Editor2 />
				<div class="ml-auto">
					<Button class="px-6 mt-6">Weiter</Button>
				</div>
			</div>
		</div>
	</div>
	<div class="w-screen min-h-screen bg-green-200 px-64 py-40">
		<div class="w-full h-max flex flex-col">
			<div
				class="w-[36px] h-[36px] text-white bg-black flex justify-center items-center rounded-full mb-6"
			>
				3
			</div>
			<div class="flex flex-col space-y-4 mb-12">
				<h1 class="text-3xl font-semibold">Vorschaubild hochladen</h1>
				<h2 class="text-sm font-medium text-gray-600">
					Lade ein Bild hoch, welches als Hauptbild dient.
				</h2>
			</div>
			{#if !file}
				<button
					on:click={getImage}
					class="w-full flex justify-center items-center border-2 border-dashed rounded-lg h-64"
				>
					<div class="text-sm font-medium text-gray-600">
						Klicke auf die Fläche, um ein Bild auszuwählen
					</div>
					<input type="file" class="hidden" bind:this={fileInput} />
				</button>
			{:else}
				<img src={fileUrl} alt="" />
			{/if}

			<div class="ml-auto">
				<Button class="px-6 mt-6">Weiter</Button>
			</div>
		</div>
	</div>
	<div class="w-screen h-screen px-64 py-40">
		<div class="w-full h-max flex flex-col">
			<div
				class="w-[36px] h-[36px] text-white bg-black flex justify-center items-center rounded-full mb-6"
			>
				4
			</div>
			<div class="flex flex-col space-y-4 mb-12">
				<h1 class="text-3xl font-semibold">Veröffentlichung festlegen</h1>
				<h2 class="text-sm font-medium text-gray-600">
					Wann soll der Bericht veröffentlicht werden?
				</h2>
			</div>
			<div class="w-3/4 flex space-x-6">
				<button
					class:border-black={publishToday}
					class="flex flex-col w-1/2 border-2 p-6 rounded-lg transition duration-200"
					on:click={() => (publishToday = true)}
				>
					<div
						class="w-4 h-4 border-2 rounded-full transition duration-200"
						class:border-4={publishToday}
						class:border-black={publishToday}
					></div>
					<div class="flex flex-col space-y-2 mt-6">
						<h1 class="text-lg font-semibold text-left">Sofort veröffentlichen</h1>
						<h2 class="text-left text-xs font-medium text-gray-600">
							Der Bericht wird nach der Fertigstellung sofort veröffentlicht.
						</h2>
					</div>
				</button>
				<button
					class:border-black={!publishToday}
					class="w-1/2 border-2 p-6 rounded-lg transition duration-200"
					on:click={() => (publishToday = false)}
				>
					<div
						class="w-4 h-4 border-2 rounded-full transition duration-200"
						class:border-4={!publishToday}
						class:border-black={!publishToday}
					></div>
					<div class="flex flex-col space-y-2 mt-6">
						<h1 class="text-lg font-semibold text-left">Zeitpunkt festlegen</h1>
						<h2 class="text-left text-xs font-medium text-gray-600">
							Der Bericht wird zum festgelegten Zeitpunkt veröffentlicht.
						</h2>
					</div>
				</button>
			</div>
			{#if !publishToday}
				<div transition:slide class="flex flex-col items-start space-y-3 w-1/2">
					<label class="font-medium mt-3" for="datetime">Zeitpunkt</label>
					<input
						class="w-full p-3 rounded-lg border-2 my-6"
						type="datetime-local"
						name="datetime"
						id="datetime"
						bind:value={publishTime}
					/>
				</div>
			{/if}
			<div class="ml-auto">
				<Button class="px-6 mt-6">Weiter</Button>
			</div>
		</div>
	</div>
</div>
