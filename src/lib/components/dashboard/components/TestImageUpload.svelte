<script>
	import { onMount } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';

	let fileInput;
	let imagePreview;
	let cropper;
	let selectedFile;

	export let crop = () => {};

	function handleFileChange(event) {
		const file = event.target.files[0];
		if (file && file.type.startsWith('image/')) {
			selectedFile = file;
			const reader = new FileReader();
			reader.onload = () => {
				imagePreview.src = reader.result;
				if (cropper) cropper.destroy(); // Lösche den vorherigen Cropper
				cropper = new Cropper(imagePreview, {
					aspectRatio: 16 / 9, // Quadrat
					viewMode: 1,
					autoCropArea: 1
				});
			};
			reader.readAsDataURL(file);
		}
	}

	function handleCrop() {
		if (cropper) {
			const canvas = cropper.getCroppedCanvas();
			const croppedImageURL = canvas.toDataURL('image/png');
			crop(croppedImageURL); // Event auslösen mit dem zugeschnittenen Bild
		}
	}

	onMount(() => {
		// Eventuell Cleanup-Logik beim Unmount hinzufügen
	});
</script>

<div class="upload-container">
	<input type="file" bind:this={fileInput} accept="image/*" on:change={handleFileChange} />
	<!-- <div>
		<img bind:this={imagePreview} alt="Vorschau" />
	</div> -->
	{#if selectedFile}
		<button on:click={handleCrop}>Bild zuschneiden</button>
	{/if}
</div>

<style>
	.upload-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	img {
		max-width: 100%;
		max-height: 300px;
		display: block;
	}
</style>
