<script lang="ts">
	import { goto } from '$app/navigation';
	import Badge from '../../ui/badge/badge.svelte';
	import Button from '../../ui/button/button.svelte';
	import * as Dialog from '../../ui/dialog';
	import { Input } from '../../ui/input/index';
	import { Label } from '../../ui/label/index';

	export let presave;
	export let save;
	export let editMode: boolean;

	let title: string, description: string, imageUrl: string;
	let inputError: boolean = false;
</script>

<header class="bg-white w-screen flex justify-between items-center py-6 px-12 border-b-2">
	<div class="flex items-center space-x-6">
		<Button
			on:click={() => {
				goto('/dashboard/posts');
			}}
			size="icon"
			class="rounded-full"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>
		</Button>
		<h1 class="text-xl font-semibold">{editMode ? 'Bericht bearbeiten' : 'Neuer Bericht'}</h1>
	</div>
	<div class="">
		<Badge variant="outline">Bearbeitungsmodus</Badge>
	</div>
	<div class="space-x-3">
		<Button variant="ghost" on:click={presave}>
			<i class="text-lg ri-eye-line mr-2" />
			Vorschau
		</Button>

		{#if editMode}
			<Button on:click={save}>
				<i class="text-lg ri-save-line mr-2" />
				Speichern
			</Button>
		{:else}
			<Dialog.Root>
				<Dialog.Trigger>
					<Button>
						<i class="text-lg ri-save-line mr-2" />
						Speichern
					</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Bericht speichern</Dialog.Title>
						<Dialog.Description>
							Schließe die Erstellung eines Berichts ab, indem du folgende Informationen
							vervollständigst.
						</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						{#if inputError}
							<p>Fülle bitte alle Felder aus.</p>
						{/if}
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="title" class="text-right">Titel</Label>
							<Input bind:value={title} id="name" name="title" class="col-span-3" />
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="description" class="text-right">Beschreibung</Label>
							<Input
								bind:value={description}
								id="description"
								name="description"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="imageUrl" class="text-right">Bild</Label>
							<Input
								bind:value={imageUrl}
								type="url"
								id="imageUrl"
								name="imageUrl"
								class="col-span-3"
							/>
						</div>
					</div>
					<Dialog.Footer>
						<Button
							on:click={() => {
								if (!title || !description || !imageUrl) {
									return (inputError = true);
								}
								presave(title, description, imageUrl);
							}}>Speichern</Button
						>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		{/if}
	</div>
</header>
