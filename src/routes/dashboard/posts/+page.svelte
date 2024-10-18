<script lang="ts">
	import Badge from '$lib/components/dashboard/ui/badge/badge.svelte';
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/dashboard/ui/dropdown-menu';
	import * as AlertDialog from '$lib/components/dashboard/ui/alert-dialog';
	import { Eye, EyeOff, Plus, Trash2 } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form;
	let createPostDialogOpen: boolean = false;
	let formElement: HTMLFormElement;

	async function changePublish(postId: string, publish: boolean) {
		const request = await fetch('/dashboard/posts/publish', {
			method: 'POST',
			body: JSON.stringify({ id: postId, publish: publish })
		});

		const data = await request.json();

		if (data.code == 200) {
			await invalidateAll();
		} else if (data.code == 400) {
			alert('Es ist ein Fehler aufgetreten');
		}
	}

	let deleteDialogOpen: boolean = false;
	let postIdDelete: string;

	async function deletePost(id: string) {
		const req = await fetch('/dashboard/posts/delete', {
			method: 'POST',
			body: JSON.stringify({ id: id })
		});

		const data = await req.json();

		if (data.code == 200) {
			toast.success('Bericht wurde erfolgreich gelöscht');
			await invalidateAll();
		} else if (data.code == 400) {
			toast.error('Beim Löschen ist ein Fehler aufgetreten.');
		} else if (data.code == 404) {
			toast.error('Der Bericht konnte nicht gefunden werden.');
		}
	}
</script>

<AlertDialog.Root bind:open={deleteDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Bericht löschen</AlertDialog.Title>
			<AlertDialog.Description>
				Das Löschen eines Berichts kann nicht mehr rückgängig gemacht werden. Die Daten des Berichts
				werden dauerhaft aus der Datenbank entfernt.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Abbrechen</AlertDialog.Cancel>
			<AlertDialog.Action asChild let:builder>
				<Button
					builders={[builder]}
					variant="destructive"
					on:click={() => {
						deletePost(postIdDelete);
					}}>Löschen</Button
				>
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
<AlertDialog.Root bind:open={createPostDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Bericht erstellen</AlertDialog.Title>
			<AlertDialog.Description>
				Erstelle einen Bericht, indem du einen Titel eingibst. Du wirst dann weitergeleitet.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<form action="/dashboard/posts?/createPost" method="post" bind:this={formElement} use:enhance>
			<div class="flex flex-col space-y-3 mb-3">
				<Label for="title">Titel</Label>
				<Input id="title" name="title" />
			</div>
		</form>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Abbrechen</AlertDialog.Cancel>
			<AlertDialog.Action asChild let:builder>
				<Button
					builders={[builder]}
					on:click={() => {
						formElement.submit();
					}}>Erstellen</Button
				>
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
<div class="w-full h-full flex flex-col">
	<div class="flex justify-between items-center mb-6">
		<div class="flex flex-col space-y-3">
			<h1 class="text-3xl font-semibold">Berichte</h1>
			<h3 class="font-medium text-gray-500">Erstelle und verwalte deine Berichte</h3>
		</div>
		<Button
			on:click={() => {
				createPostDialogOpen = true;
			}}
		>
			<Plus class="stroke-white mr-2 h-4 w-4" />
			Bericht erstellen
		</Button>
	</div>
	<div class="flex flex-col mb-12">
		<h2 class="font-medium mb-3">Alle Berichte</h2>
		<div class="grid grid-cols-3 gap-6">
			{#each data.posts as post}
				<div class="flex flex-col rounded-xl bg-gray-100">
					<div class="">
						<img class="rounded-xl" src={post.imageUrl} alt="" />
					</div>
					<div class="p-6 space-y-3">
						<div class="flex justify-between">
							<h1 class="text-lg font-semibold truncate">{post.title}</h1>
							<div class="">
								{#if post.isPublished}
									<Badge>Öffentlich</Badge>
								{/if}
							</div>
						</div>
						<p class="flex flex-1">Erstellt von {post?.expand.author.name}</p>
						<div class="flex justify-between">
							{#if post?.expand.author.id == data.user.id}
								<Button
									size="icon"
									variant="outline"
									on:click={() => {
										deleteDialogOpen = true;
										postIdDelete = post?.id;
									}}
								>
									<Trash2 size={18} />
								</Button>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Button variant="outline">
											<i class="text-lg ri-pencil-line" />
											<p class="ml-3">Bearbeiten</p>
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Group>
											<DropdownMenu.Label>Bericht bearbeiten</DropdownMenu.Label>
											<DropdownMenu.Separator />
											<DropdownMenu.Item on:click={() => goto(`/dashboard/editor?pid=${post.id}`)}
												>Inhalt bearbeiten</DropdownMenu.Item
											>

											<DropdownMenu.Sub>
												<DropdownMenu.SubTrigger>
													<!-- <Eye size={16} /> -->
													<span>Status ändern</span>
												</DropdownMenu.SubTrigger>
												<DropdownMenu.SubContent>
													<DropdownMenu.Item
														on:click={() => {
															changePublish(post.id, true);
														}}
													>
														<Eye size={16} />
														<p class="ml-2">Veröffentlichen</p>
													</DropdownMenu.Item>
													<DropdownMenu.Item
														on:click={() => {
															changePublish(post.id, false);
														}}
													>
														<EyeOff size={16} />
														<p class="ml-2">Verbergen</p>
													</DropdownMenu.Item>
												</DropdownMenu.SubContent>
											</DropdownMenu.Sub>
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							{:else}
								<div class=""></div>
								<Button href={`/blog/preview/${post.id}`} variant="outline">
									<Eye size={18} />
									<p class="ml-2">Ansehen</p>
								</Button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<!-- <div class="flex flex-col">
		<h2 class="font-medium mb-3">Meine Berichte</h2>
		<div class="grid grid-cols-3 gap-6">
			{#if data.filteredPosts.length > 0}
				{#each data.filteredPosts as post}
					<div class="flex flex-col rounded-xl bg-gray-100">
						<div class="">
							<img class="rounded-xl" src={post.imageUrl} alt="" />
						</div>
						<div class="p-6 space-y-3">
							<div class="flex justify-between">
								<h1 class="text-lg font-semibold truncate">{post.title}</h1>
								<div class="">
									{#if post.isPublished}
										<Badge>Öffentlich</Badge>
									{/if}
								</div>
							</div>
							<p class="flex flex-1">Erstellt von {post.expand.author.name}</p>
							<div class="flex justify-end">
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Button variant="outline">
											<i class="text-lg ri-pencil-line" />
											<p class="ml-3">Bearbeiten</p>
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Group>
											<DropdownMenu.Label>Bericht bearbeiten</DropdownMenu.Label>
											<DropdownMenu.Separator />
											<DropdownMenu.Item on:click={() => goto(`/dashboard/editor?pid=${post.id}`)}
												>Inhalt bearbeiten</DropdownMenu.Item
											>
											<DropdownMenu.Item>
												<i class="ri-delete-bin-line" />
												<p class="ml-2">Löschen</p>
											</DropdownMenu.Item>

											<DropdownMenu.Separator />
											<DropdownMenu.CheckboxItem bind:checked={published}>
												Öffentlich
											</DropdownMenu.CheckboxItem>
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				Du hast noch keine Berichte erstellt
			{/if}
		</div>
	</div> -->
</div>
