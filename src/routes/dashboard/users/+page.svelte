<script lang="ts">
	import * as Table from '$lib/components/dashboard/ui/table';
	import Badge from '$lib/components/dashboard/ui/badge/badge.svelte';
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import { Plus, Trash2 } from 'lucide-svelte';
	import type { PageData } from '../$types';
	import { roles } from '$lib/components/dashboard/roles';
	import * as Sheet from '$lib/components/dashboard/ui/sheet';
	import Dialog from '$lib/components/dashboard/components/Dialog.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import * as Select from '$lib/components/dashboard/ui/select/index';
	import * as AlertDialog from '$lib/components/dashboard/ui/alert-dialog';
	import * as Form from '$lib/components/dashboard/ui/form';
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import { slide } from 'svelte/transition';

	let sheetOpen: boolean = false;
	let alertDialogOpen: boolean = false;

	let currentEditedUser;

	export let data: PageData;

	let deleteFormElement: HTMLFormElement;

	function getByValue(map: Map<string, string>, searchValue: any) {
		for (let [key, value] of map.entries()) {
			if (value === searchValue) return key;
		}
	}

	let userToDelete = '';

	export let form;

	$: if (form?.success && form?.updating) {
		toast.success('Benutzer wurde erfolgreich bearbeitet');
	}
</script>

<div class="flex flex-col w-full">
	<div class="flex justify-between items-center">
		<div class="flex flex-col space-y-3">
			<h1 class="text-3xl font-semibold">Benutzer</h1>
			<h3 class="font-medium text-gray-500">Verwalte alle Benutzer dieser Anwendung</h3>
		</div>
		<Button>
			<Plus class="stroke-white mr-2 h-4 w-4" />
			Benutzer hinzufügen
		</Button>
	</div>
	<form
		action="?/deleteUser"
		method="post"
		bind:this={deleteFormElement}
		use:enhance={() => {
			return ({ update }) => {
				update({ invalidateAll: true });
			};
		}}
	>
		<input type="text" value={userToDelete} name="userId" class="hidden" />
		<AlertDialog.Root bind:open={alertDialogOpen}>
			<AlertDialog.Trigger />
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Bist du sicher?</AlertDialog.Title>
					<AlertDialog.Description>
						Das Löschen eines Benutzers kann nicht mehr rückgängig gemacht werden. Die Daten des
						Benutzers werden dauerhaft aus der Datenbank entfernt.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Abbrechen</AlertDialog.Cancel>
					<AlertDialog.Action asChild let:builder>
						<Button
							on:click={() => {
								deleteFormElement?.submit();
							}}
							builders={[builder]}
							variant="destructive">Löschen</Button
						>
					</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</form>
	<div>
		{#if form?.success && !form?.updating}
			<div
				transition:slide
				class="mb-6 rounded-md text-sm w-full p-3 bg-green-200 border border-green-300 text-green-600"
			>
				Der Benutzer wurde erfolgreich gelöscht
			</div>
		{:else if form?.error}
			<div
				transition:slide
				class="mb-6 rounded-md text-sm w-full p-3 bg-red-200 border border-red-300 text-red-600"
			>
				Ein Fehler ist beim Löschen des Benutzers aufgetreten.
			</div>
		{/if}
		<Table.Root class="w-full">
			<Table.Header>
				<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head>Benutzername</Table.Head>
					<Table.Head>E-Mail</Table.Head>
					<Table.Head>Rolle</Table.Head>
					<Table.Head class="text-center">Aktion</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data?.users as user}
					<Table.Row>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell>
							{user.username}
						</Table.Cell>
						<Table.Cell>
							<a href={'mailto:' + user.email}>{user.email}</a>
						</Table.Cell>
						<Table.Cell>
							<Badge variant="secondary">
								{roles.get(user.role)}
							</Badge>
						</Table.Cell>
						<Table.Cell class="flex justify-center items-center space-x-2"
							><Button
								on:click={(e) => {
									currentEditedUser = user;
									sheetOpen = true;
								}}
								variant="ghost"
								size="icon"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
									/>
								</svg>
							</Button>
							<Button
								on:click={() => {
									userToDelete = user.id;
									alertDialogOpen = true;
								}}
								variant="ghost"
								size="icon"
							>
								<Trash2 size="20" color="#dc2626" />
							</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>

<Sheet.Root bind:open={sheetOpen}>
	<Sheet.Content side="right" class="sm:max-w-[33vw]">
		<Sheet.Header>
			<Sheet.Title>Benutzer bearbeiten</Sheet.Title>
			<Sheet.Description>
				Ändere den ausgewählten Benutzer. Klicke Speichern, wenn du fertig bist.
			</Sheet.Description>
		</Sheet.Header>
		<!-- <form method="POST" use:enhance> -->
		<!-- <Form.Field {form} name="username">
					<Form.Control let:attrs>
						<Form.Label>Username</Form.Label>
						<Input {...attrs} bind:value={currentEditedUser.username} />
					</Form.Control>
					<Form.Description>This is your public display name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Submit</Form.Button> -->
		<!-- </form> -->
		<form id="test" action="?/updateUser" method="post" use:enhance>
			<div class="grid gap-4 py-4">
				<input name="userId" type="hidden" value={currentEditedUser.id} />
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input id="name" name="name" value={currentEditedUser.name} class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-right">Benutzername</Label>
					<Input
						id="username"
						name="username"
						value={currentEditedUser.username}
						class="col-span-3"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="email" class="text-right">E-Mail</Label>
					<Input
						id="email"
						name="email"
						type="email"
						value={currentEditedUser.email}
						class="col-span-3"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
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
				</div>
			</div>
		</form>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button
					on:click={() => {
						sheetOpen = false;
					}}
					form="test"
					type="submit">Speichern</Button
				>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
