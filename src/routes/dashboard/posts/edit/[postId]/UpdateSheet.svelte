<script lang="ts">
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import TestImageUpload from '$components/dashboard/components/TestImageUpload.svelte';
	import Switch from '$lib/components/dashboard/ui/switch/switch.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import DatePicker from '$components/dashboard/components/DatePicker.svelte';
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import * as Sheet from "$lib/components/dashboard/ui/sheet";
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import FileUploadDialog from '$components/dashboard/components/FileUploadDialog.svelte';

	export let open: boolean = false;
	export let initialData: any;


	let publishNow: boolean = false;
	let canEdit: boolean = false;

	let fileUploadOpen: boolean = true;
	let uploadedFiles: any[] = [];

	// form fields

	let title = initialData.post.title;
	let publishingDate = initialData.post.publishingDate;

	async function updatePostInformation() {
		const formData = new FormData();

		// check if values were changed
		if (title && title != initialData.post.title) {
			formData.append("title", title);
		}

		if (publishingDate && publishingDate != initialData.post.publishDate) {
			formData.append("publishDate", publishingDate);
		}

		const request = await fetch('/dashboard/posts/' + $page.params.postId + "?/updatePostInformation", {
			method: 'POST',
			body: formData,
		}).then(response => response.json().then(async (data) => {
			if (data.success) {
				await invalidateAll();
				toast.success('Update successful');
			}
		}))

	}

	let croppedImage = null;

	function handleImageCropped(image) {
		croppedImage = image;
	}


</script>

<FileUploadDialog onFinish={() => {
	fileUploadOpen = false;
	open = true;
}} onCancel={() => {
	fileUploadOpen = false;
	open = true;
}} bind:files={uploadedFiles} bind:open={fileUploadOpen} />
<Sheet.Root bind:open={open}>
	<Sheet.Content class="sm:max-w-[33vw]">
		<Sheet.Header>
			<Sheet.Title>Berichtinformationen bearbeiten</Sheet.Title>
			<Sheet.Description>
				Bearbeite Titel, Bild, Veröffentlichungsdatum und weitere Informationen über dein Bericht.
			</Sheet.Description>
		</Sheet.Header>
		<form method="post" action="?/updatePostInformation" use:enhance>
			<div class="grid gap-6 py-6">
				<div class="flex flex-col space-y-3">
					<Label for="title" class="text-left">Titel</Label>
					<Input
						on:change={() => (canEdit = true)}
						id="title"
						name="title"
						value={initialData.post?.title}
						class="col-span-3"
					/>
				</div>
				<div class="flex flex-col space-y-3 h-max">
					<Label for="username" class="text-left">Bild</Label>
					<div class="h-1/2">
<!--						<TestImageUpload on:crop={handleImageCropped} />-->
						{#if initialData.post.heroImage == ""}
							<p>Es konnte kein Bild gefunden werden.</p>
							<Button>Hochladen</Button>
							{:else}
							<div class="relative h-64">
								<img class="w-full h-full object-cover" alt="" src={"http://localhost:8090/api/files/posts/" + initialData.post.id + "/" + initialData.post.heroImage} />
							</div>
						{/if}
						<div class="w-full">
							<Button on:click={() => {
								open = false;
								fileUploadOpen = true;
							}}  class="mx-auto mt-3">Bild ändern</Button>
						</div>
						<!-- {#if croppedImage}
							<h2>Zugeschnittenes Bild:</h2>
							<img src={croppedImage} alt="Cropped Image" />
						{/if} -->
					</div>
					<!-- <Input
						id="username"
						name="username"
						value={currentEditedUser.username}
						class="col-span-3"
					/> -->
				</div>
				<div class="flex flex-col space-y-3">
					<Label for="email" class="text-left">Veröffentlichungsdatum</Label>
					<div class="grid gap-3 grid-cols-4">
						<div class="col-span-4">
							<DatePicker disabled={publishNow} />
						</div>
						<!-- <div class="">
							<Input type="time" value="12:00" />
						</div> -->
					</div>
					<div class="flex space-x-2 items-center">
						<Switch bind:checked={publishNow} id="publishNow" />
						<Label for="publishNow">Sofort veröffentlichen</Label>
					</div>
				</div>
				<!-- <div class="flex flex-col space-y-3">
					<Label for="email" class="text-left">Team</Label>
				</div> -->
				<div class="flex justify-between space-x-3 mt-6">
					<Button
						variant="outline"
						on:click={() => {
							open = false;
						}}>Abbrechen</Button
					>
					<Button type="submit">Speichern</Button>
				</div>
				<!-- <div class="grid grid-cols-4 items-center gap-4">
					<Label for="role" class="text-right">Rolle</Label>
					<Select.Root portal={null}>
						<Select.Trigger class="col-span-3">
							<Select.Value placeholder="Vergebe dem Benutzer eine Rolle" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each roles.values() as role}
									<Select.Item value={getByValue(roles, role)}>{role}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input required name="role" id="role" />
					</Select.Root>
				</div> -->
			</div>
		</form>
	</Sheet.Content>
</Sheet.Root>