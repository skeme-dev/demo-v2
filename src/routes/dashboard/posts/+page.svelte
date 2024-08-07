<script lang="ts">
	import Badge from '$lib/components/dashboard/ui/badge/badge.svelte';
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/dashboard/ui/dropdown-menu';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let published = true;
</script>

<div class="w-full h-full flex flex-col space-y-12">
	<div class="flex justify-between items-center mb-6">
		<div class="flex flex-col space-y-3">
			<h1 class="text-3xl font-semibold">Berichte</h1>
			<h3 class="font-medium text-gray-500">Erstelle und verwalte deine Berichte</h3>
		</div>
		<Button href="/dashboard/editor">
			<Plus class="stroke-white mr-2 h-4 w-4" />
			Bericht erstellen
		</Button>
	</div>
	<div class="flex flex-col">
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
		</div>
	</div>
	<div class="flex flex-col">
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
	</div>
</div>
