<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import {
		Pencil,
		PencilOff,
		Plus,
		Trash2,
		UserRound,
		ArrowRight,
		Check,
		ChevronsUpDown
	} from 'lucide-svelte';
	import Dialog from '$lib/components/dashboard/components/Dialog.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import * as Select from '$lib/components/dashboard/ui/select/index';
	import * as AlertDialog from '$lib/components/dashboard/ui/alert-dialog';
	import * as Command from '$lib/components/dashboard/ui/command/index';
	import * as Popover from '$lib/components/dashboard/ui/popover/index';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { goto, invalidateAll } from '$app/navigation';
	import { cn } from '$lib/components/dashboard/utils';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import { Description } from 'formsnap';
	import Textarea from '$lib/components/dashboard/ui/textarea/textarea.svelte';

	export let data: PageData;

	let previewTeamPicture: string;
	let formElement;
	let currentDescription: string = data.department.description;
	let descriptionEdit: boolean = false;

	let selectedUser: string;

	$: selectedValue = data.users.find((f) => f.id === selectedUser)?.name;

	// collect changed values of department
	async function updateDepartment(
		id: string = $page.params.departmentId,
		label?: string | null,
		description?: string | null,
		leaderId?: string | null
	) {
		let updateObject: any = {};

		// check if values were changed
		if (label && label != data.department.label) {
			console.log('label has changed');
			updateObject['label'] = label;
		}

		if (description && description != data.department.description) {
			console.log('description has changed');
			updateObject['description'] = description;
		}

		if (leaderId && leaderId != data.department.expand.leader.id) {
			console.log('leader has changed');
			updateObject['leader'] = leaderId;
		}

		// check if any values have changed
		if (Object.keys(updateObject).length == 0) return; // no values changed

		const request = await fetch('/dashboard/departments/' + id, {
			method: 'POST',
			body: JSON.stringify(updateObject)
		});

		const json = await request.json();

		if (json.code == 200) {
			console.log('REQUEST: ', json.message);
			descriptionEdit = false;
			await invalidateAll();
		} else {
			console.error('Anfrage konntet nicht verarbeitet werden');
			toast.error('Anfrage konntet nicht verarbeitet werden');
		}
	}

	let deleteDepartmentDialogOpen: boolean = false;

	let departmentLabel: string = '';
	let canDelete: boolean = false;

	let changeDepartmentLeaderDialogOpen: boolean = false;
	let updateOpen: boolean = false;

	$: if (departmentLabel == data.department.label) {
		canDelete = true;
	} else {
		canDelete = false;
	}
</script>

<div class="w-full flex flex-col">
	<div class="mb-12 flex justify-between items-center">
		<div class="flex flex-col space-y-3 mb-12">
			<h1 class="text-3xl font-semibold">{data.department.label}</h1>
			<h3 class="font-medium text-gray-500">Verwalte die Seite der Volleyball-Abteilung</h3>
		</div>
		<div class="">
			<Button
				variant="destructive"
				size="icon"
				on:click={() => {
					deleteDepartmentDialogOpen = true;
				}}
			>
				<Trash2 size={16} />
			</Button>
		</div>
	</div>
	<AlertDialog.Root bind:open={deleteDepartmentDialogOpen}>
		<AlertDialog.Trigger />
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Abteilung löschen</AlertDialog.Title>
				<AlertDialog.Description>
					Das Löschen dieser Abteilung kann nicht mehr rückgängig gemacht werden. Gebe bitte den
					Namen der Abteilung ein.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<div class="">
				<div class="flex flex-col space-y-3">
					<Label>Abteilungsname</Label>
					<Input bind:value={departmentLabel} />
				</div>
			</div>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Abbrechen</AlertDialog.Cancel>
				<AlertDialog.Action asChild let:builder>
					<Button
						disabled={!canDelete}
						on:click={() => {
							fetch(`/dashboard/departments/${$page.params.departmentId}/delete`, {
								method: 'POST'
							}).then(async (response) => {
								const val = await response.json();
								if (val.ok) return goto(val.redirectUrl);
							});
						}}
						builders={[builder]}
						variant="destructive">Löschen</Button
					>
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
	<AlertDialog.Root bind:open={changeDepartmentLeaderDialogOpen}>
		<AlertDialog.Trigger />
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Abteilungsleiter ändern</AlertDialog.Title>
				<AlertDialog.Description
					>Ändere den Abteilungsleiter, in dem du einen anderen Benutzer auswählst</AlertDialog.Description
				>
			</AlertDialog.Header>
			<div class="flex justify-between items-center">
				<div class="flex items-center space-x-3">
					<UserRound size={16} />
					<span>
						{data.department.expand.leader.name}
					</span>
				</div>
				<div class="">
					<ArrowRight size={16} />
				</div>
				<div class="">
					<Popover.Root bind:open={updateOpen}>
						<Popover.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="outline"
								role="combobox"
								aria-expanded={updateOpen}
								class="w-[200px] justify-between"
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
											disabled={data.department.expand.leader.id == user.id}
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
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Abbrechen</AlertDialog.Cancel>
				<AlertDialog.Action asChild let:builder>
					<Button
						disabled={typeof selectedUser == 'undefined'}
						on:click={() => {
							updateOpen = false;
						}}
						builders={[builder]}>Ändern</Button
					>
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>

	<div class="flex flex-col w-full divide-y-2 space-y-12">
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Beschreibung</h1>
			</div>
			<div class="w-3/5">
				{#if descriptionEdit}
					<div class="flex space-x-3" in:slide>
						<Input bind:value={currentDescription} type="text" />
						<!-- <Textarea bind:value={currentDescription} /> -->
						<Button
							on:click={() => {
								updateDepartment(data.department.id, null, currentDescription, selectedUser);
							}}>Speichern</Button
						>
					</div>
				{:else}
					<p class="flex items-center p-2" in:slide>
						{data.department.description}
					</p>
				{/if}
			</div>
			<div class="w-1/12 flex justify-end items-center">
				<Button on:click={() => (descriptionEdit = !descriptionEdit)} variant="outline" size="icon">
					{#if !descriptionEdit}
						<Pencil size={16} />
					{:else}
						<PencilOff size={16} />
					{/if}
				</Button>
			</div>
		</div>
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Abteilungsleiter</h1>
			</div>
			<div class="w-3/5">
				<div class="flex w-fit justify-between items-center border-2 py-3 pl-3 pr-4 rounded-lg">
					<div class="flex items-center space-x-3">
						<UserRound />
						<span class="">
							{data.department.expand.leader.name}
						</span>
					</div>
				</div>
			</div>
			<div class="w-1/12 flex justify-end items-center">
				<Button
					on:click={() => {
						changeDepartmentLeaderDialogOpen = true;
					}}
					variant="outline"
					size="icon"
				>
					<Pencil size={16} />
				</Button>
			</div>
		</div>
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Mannschaften</h1>
			</div>
			{#if !data?.department.expand.teams}
				<div class="w-3/5">Keine Mannschaften vorhanden.</div>
			{:else}
				<div class="w-3/5 grid grid-cols-2 gap-6">
					{#each data?.department.expand.teams as team}
						<div class="flex flex-col space-y-6 rounded-xl border-2 p-6 w-full">
							<!-- <img class="rounded-lg w-2/3" src={team.teamImageUrl} alt={team.label} /> -->
							<div class="w-fit bg-black rounded-full p-3 flex justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="white"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
									/>
								</svg>
							</div>

							<h1 class="text-xl font-semibold">{team.title}</h1>
							<div class="flex justify-end items-center">
								<Button href={`/dashboard/teams/${team.id}`}>Ansehen</Button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
			<div class="w-1/12 flex flex-col space-y-3 justify-start items-end">
				<Dialog dialogTitle="Mannschaft erstellen" triggerClassName="p-2.5">
					<Plus slot="dialogTrigger" class="stroke-white h-5 w-5" />
					<div slot="dialogContent">
						<form
							class="grid gap-4 py-4"
							bind:this={formElement}
							action="?/createTeam"
							method="post"
							use:enhance
							enctype="multipart/form-data"
						>
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="name" class="text-right">Name</Label>
								<Input name="title" id="name" value="Pedro Duarte" class="col-span-3" />
							</div>
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="description" class="text-right">Beschreibung</Label>
								<Input
									name="description"
									id="description"
									value="Pedro Duarte"
									class="col-span-3"
								/>
							</div>
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="username" class="text-right">Trainer</Label>
								<Select.Root portal={null}>
									<Select.Trigger class="w-max">
										<Select.Value placeholder="Wähle einen Benutzer aus" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Benutzer</Select.Label>
											{#each data.users as user}
												<Select.Item value={user.id} label={user.name}>{user.name}</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
									<Select.Input name="userId" />
								</Select.Root>
							</div>
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="pic" class="text-right">Bild</Label>
								<div class="col-span-3 flex flex-col justify-center items-center">
									<Input
										on:change={(e) => {
											const file = e.target.files[0];
											if (file) {
												previewTeamPicture = URL.createObjectURL(file);
											}
										}}
										accept="image/*"
										id="pic"
										type="file"
										name="team_image"
									/>
									{#if previewTeamPicture}
										<div class="max-w-[50%]">
											<img src={previewTeamPicture} class="w-full rounded-md my-3 mx-auto" alt="" />
										</div>
									{/if}
								</div>
							</div>
						</form>
					</div>
					<div class="" slot="dialogFooter">
						<Button
							on:click={() => {
								formElement?.submit();
							}}
							type="submit">Erstellen</Button
						>
					</div>
				</Dialog>

				<Button disabled={!data?.department.expand.teams} variant="outline" size="icon">
					<Pencil size={16} />
				</Button>
			</div>
		</div>
	</div>
</div>
