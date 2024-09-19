<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/dashboard/ui/button/index.js';
	import * as Dialog from '$lib/components/dashboard/ui/dialog/index';
	import { getCroppedImg } from '$lib/utils/canvasUtils';

	import * as Select from '$lib/components/dashboard/ui/select';

	import Cropper from 'svelte-easy-crop';

	export let croppedImageOutput;
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let aspect = 8 / 5;
	let image, fileinput, pixelCrop, croppedImage;

	export let imageUrl;
	let open = false;

	image = imageUrl;

	function previewCrop(e) {
		pixelCrop = e.detail.pixels;
		const { x, y, width } = e.detail.pixels;
		const scale = 200 / width;
		// profilePicture.style = `margin: ${-y * scale}px 0 0 ${-x * scale}px; width: ${
		// 	profilePicture.naturalWidth * scale
		// }px;`;
	}

	async function cropImage() {
		croppedImageOutput = await getCroppedImg(image, pixelCrop);
		console.log('cropped: ', croppedImageOutput);
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' w-1/3'}
		>Zuschneiden</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[50vw] h-fit">
		<Dialog.Header>
			<Dialog.Title>Bild zuschneiden</Dialog.Title>
			<Dialog.Description>
				Schneide dein ausgewählter Bild im vorgegebenen Format aus
			</Dialog.Description>
		</Dialog.Header>
		<div class="space-y-3 h-[50vh]">
			<div class="h-[90%]">
				<div class="rounded-xl relative w-full h-full">
					<Cropper
						minZoom={0.5}
						{image}
						bind:crop
						bind:zoom
						zoomSpeed={0.1}
						on:cropcomplete={(e) => previewCrop(e)}
						bind:aspect
					/>
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={() => cropImage()}>Zuschnitt verwenden</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
