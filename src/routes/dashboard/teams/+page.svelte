<script lang="ts">
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';
	import type { PageData } from './$types';
	import { readable } from 'svelte/store';
	import { Role } from '@prisma/client';
	import * as Table from '$lib/components/dashboard/ui/table';
	import Badge from '$lib/components/dashboard/ui/badge/badge.svelte';
	import { Plus } from 'lucide-svelte';

	type User = {
		name: string;
		email: string;
		role: Role;
		department: Department | string;
	};

	const users = readable<User[]>([
		{
			name: 'John Doe',
			email: 'john.doe@skeme.dev',
			department: 'Volleyball',
			role: Role.USER
		},
		{
			name: 'Jane Doe',
			email: 'jane.doe@skeme.dev',
			department: 'Volleyball',
			role: Role.ADMIN
		}
	]);

	const schedules = readable([{}]);

	const table = createTable(users);

	const schedule = createTable();

	const columns = table.createColumns([
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'email',
			header: 'E-Mail'
		}),
		table.column({
			accessor: 'department',
			header: 'Abteilung'
		}),
		table.column({
			accessor: 'role',
			header: 'Rolle',
			cell: ({ value }) => {
				switch (value) {
					case 'USER':
						return 'Benutzer';

					case 'ADMIN':
						return 'Administrator';
					case 'TRAINER':
						return 'Trainer';
					case 'LEADER':
						return 'Abteilungsleiter';
					default:
						break;
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);

	export let data: PageData;
</script>

<div class="flex flex-col w-full">
	<div class="flex flex-col space-y-3 mb-6">
		<h1 class="text-3xl font-semibold">Teams</h1>
		<h3 class="font-medium text-gray-500">Verwalte dein Team</h3>
	</div>
	<div class="flex space-x-12">
		<div class="w-1/4 flex flex-col space-y-6 border-2 p-6 rounded-lg">
			<div class="flex justify-between items-center">
				<h1 class="text-lg font-semibold">1. Männerschaft</h1>
				<Button variant="outline" size="icon">
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
				<!-- <h2 class="text-sm">Generelle Information über das Team</h2> -->
			</div>
			<div class="flex flex-col space-y-3">
				<h2 class="text-sm font-medium">Teambild</h2>
				<div class="flex flex-col space-y-4">
					<img
						class="w-full rounded-lg"
						src="https://www.sgplatjenwerbe.de/_cache/images/cms/Veranstaltungen/.eea67c2ad402cb506bbdc8e4ee68c166/U15.jpg"
						alt=""
					/>
					<Button variant="outline">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
							/>
						</svg>

						Bearbeiten
					</Button>
				</div>
			</div>
			<div class="flex flex-col space-y-3 !mt-8">
				<h2 class="text-sm font-medium">Beschreibung</h2>
				<div class="flex flex-col space-y-4">
					<p class="text-sm text-justify">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ea tempore alias
						quaerat fugit ipsa harum ducimus? Aut, quod deleniti.
					</p>
					<Button variant="outline">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
							/>
						</svg>

						Bearbeiten
					</Button>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col w-3/4 space-y-6">
			<div class="border-2 p-6 rounded-lg space-y-6">
				<div class="flex justify-between items-center">
					<h1 class="font-medium">Mitglieder</h1>
					<Button variant="ghost">
						<Plus class="stroke-black mr-2 h-4 w-4" />
						Mitglied hinzufügen
					</Button>
				</div>
				<Table.Root class="w-full" {...$tableAttrs}>
					<Table.Header>
						{#each $headerRows as headerRow}
							<Subscribe rowAttrs={headerRow.attrs()}>
								<Table.Row>
									{#each headerRow.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
											<Table.Head {...attrs}>
												<Render of={cell.render()} />
											</Table.Head>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Header>
					<Table.Body {...$tableBodyAttrs}>
						{#each $pageRows as row (row.id)}
							<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
								<Table.Row {...rowAttrs}>
									{#each row.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs>
											<Table.Cell {...attrs}>
												{#if cell.id == 'role'}
													<Badge variant="secondary">
														<Render of={cell.render()} />
													</Badge>
												{:else}
													<Render of={cell.render()} />
												{/if}
											</Table.Cell>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>

			<div class="border-2 p-6 rounded-lg space-y-6">
				<div class="flex justify-between items-center">
					<h1 class="font-medium">Trainingszeiten</h1>
					<Button variant="ghost">
						<Plus class="stroke-black mr-2 h-4 w-4" />
						Trainingszeit hinzufügen
					</Button>
				</div>
				<Table.Root class="w-full" {...$tableAttrs}>
					<Table.Header>
						{#each $headerRows as headerRow}
							<Subscribe rowAttrs={headerRow.attrs()}>
								<Table.Row>
									{#each headerRow.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
											<Table.Head {...attrs}>
												<Render of={cell.render()} />
											</Table.Head>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Header>
					<Table.Body {...$tableBodyAttrs}>
						{#each $pageRows as row (row.id)}
							<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
								<Table.Row {...rowAttrs}>
									{#each row.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs>
											<Table.Cell {...attrs}>
												{#if cell.id == 'role'}
													<Badge variant="secondary">
														<Render of={cell.render()} />
													</Badge>
												{:else}
													<Render of={cell.render()} />
												{/if}
											</Table.Cell>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	</div>
</div>
