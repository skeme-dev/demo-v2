<script lang="ts">
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import { Plus, Building, ChevronRight, ChevronsUpDown, Check } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Dialog from '$lib/components/dashboard/components/Dialog.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import * as Popover from '$lib/components/dashboard/ui/popover';
	import * as Command from '$lib/components/dashboard/ui/command';
	import { cn } from '$lib/components/dashboard/utils';
	import { invalidateAll } from '$app/navigation';

	let selectedUser: string;
	let createDepartmentDialogOpen: boolean = false;
	let userPopoverOpen: boolean = false;

	let label: string;
	let description: string;
	let leaderId: string;

	let error: string;

	$: selectedValue = data.users.find((f) => f.id === selectedUser)?.name;

	async function createDepartment() {
		if (!label && !description && !leaderId) return (error = 'Fülle alle Felder aus');

		const payload = {
			label: label,
			description: description,
			leader: selectedUser
		};

		fetch('/dashboard/departments', {
			method: 'POST',
			body: JSON.stringify(payload)
		}).then((response) =>
			response.json().then(async (value) => {
				console.log(value);
				createDepartmentDialogOpen = false;
				await invalidateAll();
			})
		);
	}

	export let data: PageData;
</script>

<div class="w-full flex flex-col">
	<div class="flex justify-between items-center mb-12">
		<div class="flex flex-col space-y-3">
			<h1 class="text-3xl font-semibold">Abteilungen</h1>
			<h3 class="font-medium text-gray-500">Verwalte alle Abteilungen des Vereins</h3>
		</div>
		<Dialog
			bind:open={createDepartmentDialogOpen}
			dialogTitle="Abteilung erstellen"
			triggerClassName="-p-2.5"
			dialogDescription=""
		>
			<Button slot="dialogTrigger">
				<Plus class="stroke-white mr-2 h-4 w-4" />
				Abteilung hinzufügen
			</Button>

			<div slot="dialogContent">
				{#if error}
					<p class="text-red-400 font-medium">{error}</p>
				{/if}
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name" class="text-right">Name</Label>
						<Input bind:value={label} name="title" id="name" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="description" class="text-right">Beschreibung</Label>
						<Input
							bind:value={description}
							name="description"
							id="description"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="username" class="text-right">Trainer</Label>
						<Popover.Root bind:open={userPopoverOpen}>
							<Popover.Trigger asChild let:builder>
								<Button
									builders={[builder]}
									variant="outline"
									role="combobox"
									aria-expanded={userPopoverOpen}
									class="w-[300px] justify-between"
								>
									{#if selectedValue}
										{selectedValue}
									{:else}
										Wähle Benutzer...
									{/if}

									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</Popover.Trigger>
							<Popover.Content class="w-[200px] p-0">
								<Command.Root>
									<Command.Input placeholder="Suche Benutzer..." />
									<Command.Empty>Keine Benutzer gefunden</Command.Empty>
									<Command.Group>
										{#each data.users as user}
											<Command.Item
												value={user.name}
												onSelect={() => {
													selectedUser = user.id;
												}}
											>
												<Check
													class={cn('mr-2 h-4 w-4', selectedUser !== user.id && 'text-transparent')}
												/>
												{user.name}
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>
					</div>
				</div>
			</div>
			<div class="" slot="dialogFooter">
				<Button on:click={() => createDepartment()}>Erstellen</Button>
			</div>
		</Dialog>
	</div>

	<div class="w-full grid grid-cols-3 gap-6">
		{#each data?.departments as department}
			<a
				href={'/dashboard/departments/' + department.id}
				class="transition durtation-100 hover:bg-accent flex flex-col p-6 border-2 rounded-lg space-y-6"
			>
				<div class="flex justify-center items-center w-12 h-12 bg-black rounded-full">
					<Building class="stroke-white" size={20} />
				</div>
				<div class="flex justify-between items-center">
					<span class="text-2xl font-semibold">
						{department.label}
					</span>
					<Button variant="ghost" size="icon" href={'/dashboard/departments/' + department.id}>
						<ChevronRight size={16} />
					</Button>
				</div>
			</a>
		{/each}
	</div>
</div>
