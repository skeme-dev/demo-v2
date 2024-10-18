<script lang="ts">
	import { Plus } from 'lucide-svelte';

	import Button from '../ui/button/button.svelte';
	import Badge from '../ui/badge/badge.svelte';
	import { slide } from 'svelte/transition';
	import Dialog from './Dialog.svelte';
	import { enhance } from '$app/forms';
	import Input from '../ui/input/input.svelte';

	export let handler;
	export let open: boolean;
	export let users: any[];

	let searchTerm: string;

	console.log(users[0].name.toLowerCase());

	$: filteredUsers = users.filter(
		(user) => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let selectedTrainers: any[] = [];
	let formElement: HTMLFormElement;
</script>

<Dialog hasTrigger={false} dialogTitle="Trainer hinzufügen" bind:open>
	<div slot="dialogContent">
		<form
			class="grid gap-4 py-4"
			bind:this={formElement}
			action="?/addTrainer"
			method="post"
			use:enhance
		>
			<div class="flex flex-col">
				<div class="px-3 mb-3 flex space-x-3 items-center">
					<Input bind:value={searchTerm} type="search" placeholder="Suche Benutzer..." />
				</div>
				<div class="flex flex-col space-y-2 overflow-y-auto h-36">
					{#if filteredUsers.length != 0}
						{#each filteredUsers as user, index (index)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div class="py-1 flex items-center w-full cursor-pointer hover:bg-slate-100 rounded">
								<input
									type="checkbox"
									class="ml-3"
									bind:group={selectedTrainers}
									name="box"
									id={`box-${index}`}
									value={user.id}
								/>
								<label for={`box-${index}`} class="py-1 flex-1 ml-3 cursor-pointer"
									>{user.name}</label
								>
								<Badge class="mr-3" variant="outline">
									{#if user.role == 'TRAINER'}
										Trainer
									{:else if user.role == 'ADMINISTRATOR'}
										Administrator
									{:else}
										Benutzer
									{/if}
								</Badge>
							</div>
						{/each}
					{:else}
						<div class="text-center mt-3 text-xs font-medium text-gray-500">
							Benutzer konnte nicht gefunden werden.
						</div>
					{/if}
				</div>
			</div>

			<div class="flex mt-3">
				{#if selectedTrainers.length > 0}
					<div class="flex flex-col space-y-2" transition:slide>
						<div class="">Ausgewählte Benutzer</div>
						<div class="space-x-3">
							{#each selectedTrainers as trainer}
								<Badge variant="secondary">
									{users.filter((v) => v.id == trainer)[0].name}
								</Badge>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</form>
	</div>
	<div slot="dialogFooter">
		<Button on:click={handler} type="submit">
			<Plus class="stroke-white mr-2 h-4 w-4" />
			<p>Hinzufügen</p>
		</Button>
	</div>
</Dialog>
