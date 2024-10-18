<script lang="ts">
	import { getCroppedImg } from '$lib/utils/canvasUtils';
	import Cropper from 'svelte-easy-crop';
	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';

	export let imageFile: File;
	export let croppedImage: Blob;
	export let enable: boolean;

	let pixelCrop: any;
	let crop;

	const imageUrl = URL.createObjectURL(imageFile) as string;

	async function cropImage() {
		croppedImage = await getCroppedImg(imageUrl, pixelCrop);
		enable = false;
	}

	let zoom = 1;
	onMount(() => {
		enable = true;
	});
</script>

<div class="relative h-full flex-col space-y-3">
	<div class="w-full h-[100px]">
		<Cropper
			image={imageUrl}
			bind:crop
			bind:zoom
			on:cropcomplete={(e) => (pixelCrop = e.detail.pixels)}
		/>
	</div>

	<Button
		variant="outline"
		class="absolute bottom-5 left-1/2 -translate-x-1/2 z-[999]"
		on:click={() => cropImage()}>Zuschneiden</Button
	>
</div>
