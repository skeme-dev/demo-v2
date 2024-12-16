<script lang="ts">
	import * as Dialog from "$lib/components/dashboard/ui/dialog";
	import { Button, buttonVariants } from '$components/dashboard/ui/button';
	import { Label } from '$components/dashboard/ui/label';
	import { Eye, Trash } from 'lucide-svelte';
	import { slide } from "svelte/transition";
	import { toast } from 'svelte-sonner';

	export let open: boolean = true;
	export let files: File[] = [];
	export let allowMultiple: boolean = false;
	export let onCancel;
	export let onFinish;

	let previewUrls: (string|null)[];

	function handleFileChange(event: Event) {
		const uploadedFiles = Array.from(event.target.files);
		files = [...files, ...uploadedFiles];

		// Generiere Vorschau-URLs für Bilder
		previewUrls = files.map(file => {
			if (file.type.startsWith("image/")) {
				return URL.createObjectURL(file);
			}
			return null;
		});
	}

	function removeFile(index) {
		files.splice(index, 1);
		previewUrls.splice(index, 1);

		files = files;
		previewUrls = previewUrls;

		// Speicher freigeben für Blob-URLs
		if (previewUrls[index]) {
			URL.revokeObjectURL(previewUrls[index]);
		}
	}

	let description: string = allowMultiple ? 'Lade mehrere Dateien hoch. Wenn du fertig bist, klicke auf "Dateien benutzen"' : "Lade eine Datei hoch. Wenn du fertig bist, klicke auf \'Dateien benutzen\'";
	let finishButtonText: string = allowMultiple ? "Dateien benutzen" : "Datei benutzen";
</script>

<Dialog.Root class="z-[999]" bind:open={open}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Datei hochladen</Dialog.Title>
			<Dialog.Description>
				{description}
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col ">
			<!-- File upload -->
			<div class="w-full">
				<Label for="f" class="w-full border-2 rounded-lg border-dashed flex justify-center items-center flex-col py-16">
					<div class="text-sm font-medium">Klicke auf die Fläche und wähle eine Datei aus.</div>
					<div class="text-xs font-medium text-gray-400">Nur Dateien unter 5 MB</div>
				</Label>
				<input class="hidden" id="f" name="f" type="file" on:change={handleFileChange} accept="image/*" multiple={allowMultiple} />
			</div>
			{#if files.length > 0}
				<div transition:slide class="flex flex-col space-y-2 mt-3">
					<h1 class="font-medium text-sm">Ausgewählte Dateien</h1>
					<div class="flex flex-col">
						{#each files as file, index}
							<div class="flex justify-between items-center p-3 rounded-lg bg-gray-100">
								<p class="font-medium text-sm">
									{file.name}
								</p>
								<div class="flex space-x-3">
									<Button size="icon" variant="outline" on:click={() => {
										window.open(previewUrls[index]);
									}}>
										<Eye size={16} />
									</Button>
									<Button on:click={() => {
								removeFile(index);
							}} size="icon" variant="outline">
										<Trash size={16} />
									</Button>
								</div>
							</div>
						{/each}
					</div>
			</div>
			{/if}
		</div>
		<Dialog.Footer>
			<Button class="mr-auto" on:click={() => {
				files = [];
				previewUrls = [];
				onCancel();
			}} variant="outline">Abbrechen</Button>
			<Button disabled={files.length == 0} type="submit" on:click={() => {
				if (files.length == 0) {
					return toast.error("Du musst eine Datei auswählen.");
				}
				onFinish();
			}}>{finishButtonText}</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>