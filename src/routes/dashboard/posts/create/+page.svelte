<script lang="ts">
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import { Plus, Trash2, CloudUpload } from 'lucide-svelte';
	import Editor3 from '$lib/components/dashboard/components/editor/Editor3.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import Switch from '$lib/components/dashboard/ui/switch/switch.svelte';
	import { slide } from 'svelte/transition';
	import ImageUploadDialog from '$lib/components/dashboard/components/ImageUploadDialog.svelte';
	import { toast } from 'svelte-sonner';

	let attachImages: boolean = true;
	let imageUploadDialogOpen: boolean = false;

	let attachedImages: Blob[] = [];
	let latestImage: Blob | null;

	$: if (latestImage) {
		attachedImages = [...attachedImages, latestImage];
		latestImage = null;
	}

	function removeImage(index: number) {
		attachedImages.splice(index, 1);
		attachedImages = attachedImages;
	}

	function uploadImages() {
		if (attachedImages.length == 0) return toast.error('Es wurden keine Bilder ausgewählt');
		toast.info('Lol');
	}
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex justify-between items-center mb-6">
		<div class="flex flex-col space-y-3">
			<h1 class="text-3xl font-semibold">Neuer Bericht</h1>
			<h3 class="font-medium text-gray-500">Schreibe und erstelle einen neuen Bericht</h3>
		</div>
	</div>
	<!-- Editor -->
	<div class="flex flex-col w-full">
		<div class="">
			<Editor3 />
		</div>
		<div class="flex flex-col mt-8">
			<div class="flex justify-between items-center">
				<div class="flex items-center space-x-2 mb-4">
					<Switch bind:checked={attachImages} id="t" />
					<Label for="t">Bilder anhängen</Label>
				</div>
				{#if attachImages || attachedImages.length > 0}
					<Button on:click={() => uploadImages()}>
						<CloudUpload class="mr-2 h-4 w-4" />
						<span> Bilder hochladen </span>
					</Button>
				{/if}
			</div>
			{#if attachImages}
				<div class="grid grid-cols-12 gap-6" transition:slide>
					{#if attachedImages.length > 0}
						{#each attachedImages as img, index}
							<div class="col-span-3 relative flex flex-1 flex-col rounded-lg bg-gray-100 p-3">
								<div class="flex justify-between items-center">
									<div class="flex flex-col space-y-1">
										<h1 class="font-medium">Bild {index + 1}</h1>
									</div>
									<div class="">
										<Button
											on:click={() => {
												removeImage(index);
											}}
											size="icon"
											variant="outline"
										>
											<Trash2 size={16} />
										</Button>
									</div>
								</div>
								<div class="relative mt-3 w-full h-max">
									<img
										src={URL.createObjectURL(img)}
										class="mx-auto w-max h-full object-contain rounded-lg"
										alt=""
									/>
								</div>
							</div>
						{/each}
					{/if}
					<button
						class="col-span-2 px-6 py-12 border-2 border-dashed rounded-lg flex justify-center items-center"
						on:click={() => (imageUploadDialogOpen = true)}
					>
						<div class="flex flex-col justify-center items-center space-y-3">
							<Plus class="text-gray-500" size={16} />
							<div class="text-sm font-medium text-gray-500">Bild hinzufügen</div>
						</div>
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
<ImageUploadDialog bind:image={latestImage} bind:open={imageUploadDialogOpen} />
