<script lang="ts">
	import { Trash2 } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import * as Dialog from '../ui/dialog';
	import CropperComponent from './CropperComponent.svelte';

	export let file: File;
	export let open: boolean;
	export let image: Blob;

	let fileInput;
	let fileHandle;

	let showFilePicker: boolean = true;
	let nextButtonDisabled: boolean = true;
	let cropped: boolean = false;

	let fileUrl: string;
	let croppedImage: Blob = '';
	let croppedImageUrl: string;

	let step: number = 1;

	$: if (file) {
		nextButtonDisabled = false;
	}

	$: if (croppedImage) {
		croppedImageUrl = URL.createObjectURL(croppedImage);
	}

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

	async function getImage(e: Event) {
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
		}

		if (file) {
			fileUrl = URL.createObjectURL(file);
		}

		nextButtonDisabled = false;
		showFilePicker = false;
	}

	function format(s: number) {
		const d = new Date(s);
		return d.toLocaleString();
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class=" sm:max-w-[60%] h-2/3 flex flex-col">
		<Dialog.Header class="h-fit">
			<Dialog.Title>Bild hochladen</Dialog.Title>
			<Dialog.Description>Lade ein Bild hoch und schneide es gegebenfalls zu.</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-1 space-x-6">
			<div class="w-1/4 h-full flex flex-col space-y-3">
				<button class="p-3 text-sm flex items-center space-x-3 rounded-lg hover:bg-gray-50">
					<div
						class="text-xs text-white bg-black w-6 h-6 rounded-full flex justify-center items-center"
						class:!text-black={step != 1}
						class:bg-gray-100={step != 1}
					>
						1
					</div>
					<div class="">Hochladen</div>
				</button>
				<button class="p-3 text-sm flex items-center space-x-3 rounded-lg hover:bg-gray-50">
					<div
						class="text-xs text-white bg-black w-6 h-6 rounded-full flex justify-center items-center"
						class:!text-black={step != 2}
						class:bg-gray-100={step != 2}
					>
						2
					</div>
					<div class="">Zuschneiden</div>
				</button>
				<button class="p-3 text-sm flex items-center space-x-3 rounded-lg hover:bg-gray-50">
					<div
						class="text-xs text-white bg-black w-6 h-6 rounded-full flex justify-center items-center"
						class:!text-black={step != 3}
						class:bg-gray-100={step != 3}
					>
						3
					</div>
					<div class="">Fertigstellen</div>
				</button>
			</div>
			<div class="relative w-3/4">
				{#if step == 1}
					{#if showFilePicker}
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
						<div class="flex flex-col h-max space-y-3">
							<div class="relative flex flex-1 flex-col rounded-lg bg-gray-100 p-3">
								<div class="flex justify-between items-center">
									<div class="flex flex-col space-y-1">
										<h1 class="font-medium">{file?.name}</h1>
										<div class="flex space-x-3">
											<span class="text-xs text-gray-500"
												>{(file?.size / 1_000_000).toPrecision(2)} MB</span
											>
											<span class="text-xs text-gray-500">
												Zuletzt geändert: {format(file?.lastModified)}
											</span>
										</div>
									</div>
									<div class="">
										<Button
											on:click={() => {
												showFilePicker = true;
												nextButtonDisabled = true;
											}}
											size="icon"
											variant="outline"
										>
											<Trash2 size={16} />
										</Button>
									</div>
								</div>
								<div class="relative mt-3 w-full h-[175px]">
									<img
										src={fileUrl}
										class="mx-auto w-max h-full object-contain rounded-lg"
										alt=""
									/>
								</div>
							</div>
						</div>
					{/if}
				{:else if step == 2}
					<div class="flex flex-col w-full h-full">
						<CropperComponent bind:enable={cropped} bind:croppedImage imageFile={file} />
					</div>
				{:else}
					<div class="flex flex-col w-full h-full">
						<div class="w-full h-[300px]">
							<img class="mx-auto w-max h-full object-contain" src={croppedImageUrl} alt="" />
						</div>
					</div>
				{/if}
			</div>
		</div>
		<Dialog.Footer>
			{#if step > 1}
				<Button
					variant="outline"
					on:click={() => {
						step -= 1;
						if (step == 1) {
							cropped = false;
						}
					}}>Zurück</Button
				>
			{/if}

			<Button
				disabled={nextButtonDisabled || cropped}
				on:click={() => {
					if (step > 0 && step < 3) {
						return step++;
					} else if (step == 3) {
						URL.revokeObjectURL(fileUrl);
						URL.revokeObjectURL(croppedImageUrl);
						image = croppedImage;

						showFilePicker = true;
						step = 1;

						open = false;
					}
				}}>{step == 3 ? 'Fertigstellen' : 'Weiter'}</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
