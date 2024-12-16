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
	import {Checkbox} from "$lib/components/dashboard/ui/checkbox/"
	import * as Select from "$lib/components/dashboard/ui/select";
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let form;

	let formElement: HTMLFormElement;

	async function changePublish(postId: string, publish: boolean) {
		const request = await fetch('/dashboard/posts/publish', {
			method: 'POST',
			body: JSON.stringify({ id: postId, publish: publish })
		});

		const data = await request.json();

		if (data.code == 200) {
			await invalidateAll();
			toast.success("Der Status des Berichts wurde geändert.");
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

	let selectedDepartments: string[] = [];
	let selectedTeams: string[] = [];

	let myPosts

	const otherPosts = data.posts.filter((post) => {
		return post.expand.author.id != data.user.id;
	})

	let publishOnDepartment: boolean = false;
	let createPostDialogOpen: boolean = false;
	let postCreateFormHasError: boolean = false;

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
				Erstelle einen Bericht, indem du einen Titel eingibst. Wähle außerdem Abteilungen oder Teams aus.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<form action="/dashboard/posts?/createPost" method="post" bind:this={formElement} use:enhance>
			<div class="flex flex-col">
			<div class="flex flex-col space-y-3 mb-3">
				<Label for="title">Titel</Label>
				<Input id="title" name="title" />
			</div>
				<input name="role" class="hidden" value={data.user.role} />
				<input name="leaderDepartmentId" class="hidden" value={publishOnDepartment ? data.leaderDepartment.id : null} />
				<input name="teamId" class="hidden" value={data.trainerTeam ? data.trainerTeam.id : null} />
				<input name="correspondingTeams" class="hidden" value={selectedTeams.length > 0 ? JSON.stringify({items: selectedTeams}) : ""} />
				<div class="mb-3 flex flex-col space-y-3">
				<div class={"flex " + (data.user.role == "DEPARTMENT_LEADER" ? "flex-col space-y-3" : "space-x-6")}>
					{#if data.user.role != "TRAINER"}
						<div class:w-full={data.user.role == "DEPARTMENT_LEADER"} class="w-1/2 space-y-2">

							{#if data.user.role == "DEPARTMENT_LEADER"}
								<div>
								<Checkbox id="publishOnDepartment" bind:checked={publishOnDepartment} aria-labelledby="pod-label" />
								<Label
									id="pod-label"
									for="publishOnDepartment"
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Auf Abteilungseite veröffentlichen
								</Label>
								</div>
							{:else}
								<Select.Root selected={selectedDepartments} onSelectedChange={(s) => {
							if (s) {
								selectedDepartments = [...s];
							} else {
								selectedDepartments = [];
							}

						}} portal={null}>
									<Select.Trigger  class="w-full">
										<Select.Value placeholder="Wähle eine Abteilung aus" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Abteilungen</Select.Label>
											{#each data.departments as department}
												<Select.Item value={department.id} label={department.label}
												>{department.label}</Select.Item
												>
											{/each}
										</Select.Group>
									</Select.Content>
									<Select.Input name="department" />
								</Select.Root>
							{/if}
						</div>

					<div class:w-full={data.user.role == "TRAINER"} class="w-1/2 space-y-2">
						<Label>Team</Label>
						<Select.Root onSelectedChange={(s) => {
							if (s) {
								selectedTeams = [...s];
							} else {
								selectedTeams = [];
							}
						}} multiple portal={null} disabled={publishOnDepartment}>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Wähle ein Team aus" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Teams</Select.Label>
									{#each data.teams as team}
										<Select.Item value={team.id} label={team.title}
										>{team.title}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name="teams" />
						</Select.Root>
					</div>
						{:else}
						<div class="text-muted-foreground text-sm">Der erstellte Bericht wird als Mannschaftsbericht veröffentlicht.</div>
					{/if}
				</div>
			</div>

			</div>
		</form>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class="mr-auto">Abbrechen</AlertDialog.Cancel>
				<Button

					on:click={() => {
						console.log(selectedTeams);
						if (!publishOnDepartment && (selectedTeams?.length == 0 || !selectedTeams)) {
							return toast.error("Wähle eine Veröffentlichungsoption aus.");
						}

						formElement.submit();
					}}>Erstellen</Button
				>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
<div class="w-full flex flex-col mb-6 h-fit">
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
	<div class="flex flex-col space-y-1 mb-12">
		<h2 class="font-medium mb-3">Meine Berichte</h2>
		{#if data.posts.filter((post) => {return post.expand.author.id == data.user.id}).length > 0}
		<div class="grid grid-cols-3 gap-6">
			{#each data.posts.filter((post) => {return post.expand.author.id == data.user.id;}) as post}
				<div class="flex flex-col rounded-xl border p-6 hover:bg-accent">
					<div class="">
						<img class="rounded-lg" src={post.imageUrl} alt="" />
					</div>
					<div class="mt-3">
						<div class="flex flex-col">
								{#if post.isPublished}
							<div>
									<Badge variant="outline">Öffentlich</Badge>
							</div>
								{/if}
							<h1 class="text-lg font-semibold truncate mt-3">{post.title}</h1>
						</div>
						<p class="flex flex-1 my-2 text-xs text-muted-foreground font-medium">Erstellt von {post?.expand.author.name}</p>
						<div class="flex justify-between mt-3">
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
											<DropdownMenu.Item on:click={() => goto(`/dashboard/posts/edit/${post.id}`)}
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
								<Button class="w-full" href={`/blog/preview/${post.id}`} variant="outline">
									<Eye size={18} />
									<p class="ml-2">Ansehen</p>
								</Button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
			{:else}
			<div class="w-full py-6 flex items-center justify-center">
				<p class="text-muted-foreground text-sm font-medium">Du hast noch keine Berichte erstellt.</p>
			</div>
		{/if}
	</div>
	<div class="flex flex-col mb-12">
		<h2 class="font-medium mb-3">Berichte von anderen Benutzern</h2>
		<div class="grid grid-cols-3 gap-6">
			{#each otherPosts as post}
				<div class="flex flex-col rounded-xl border p-6 hover:bg-accent">
					<div class="">
						<img class="rounded-lg" src={post.imageUrl} alt="" />
					</div>
					<div class="mt-3">
						<div class="flex flex-col">
							{#if post.isPublished}
								<div>
									<Badge variant="outline">Öffentlich</Badge>
								</div>
							{/if}
							<h1 class="text-lg font-semibold truncate mt-3">{post.title}</h1>
						</div>
						<p class="flex flex-1 my-2 text-xs text-muted-foreground font-medium">Erstellt von {post?.expand.author.name}</p>
						<div class="flex justify-between mt-3">
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
								<Button class="w-full" href={`/blog/preview/${post.id}`} variant="outline">
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
