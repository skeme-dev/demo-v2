<script lang="ts">
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import type { PageData } from './$types';
	import * as Table from '$lib/components/dashboard/ui/table';
	import Badge from '$lib/components/dashboard/ui/badge/badge.svelte';
	import { Plus } from 'lucide-svelte';
	// import { pb } from '$lib/db/pocketbase';
	import Dialog from '$lib/components/dashboard/components/Dialog.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import * as Select from '$lib/components/dashboard/ui/select/index';
	import { enhance } from '$app/forms';
	import { roles } from '$lib/components/dashboard/roles';
	import { slide } from 'svelte/transition';

	const weekdays = [
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag',
		'Sonntag'
	];

	export let data: PageData;

	let searchTerm: string = '';

	$: filteredUsers = data.users.filter(
		(user) => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
	console.log(filteredUsers);

	let selectedTrainers: any[] = [];
	let formElement: HTMLFormElement;
</script>

<div class="flex flex-col w-full">
	<div class="flex flex-col space-y-3 mb-6">
		<h1 class="text-3xl font-semibold">Teams</h1>
		<h3 class="font-medium text-gray-500">Verwalte dein Team</h3>
	</div>
	<div class="flex space-x-12">
		<div class="w-1/4 flex flex-col space-y-6 border-2 p-6 rounded-lg">
			<div class="flex justify-between items-center">
				<h1 class="text-lg font-semibold">{data.team.title}</h1>
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
					<img class="w-full rounded-lg" src={data.team.team_image} alt="" />
				</div>
			</div>
			<div class="flex flex-col space-y-3 !mt-8">
				<h2 class="text-sm font-medium">Beschreibung</h2>
				<div class="flex flex-col space-y-4">
					<p class="text-sm text-justify">
						{data.team.description}
					</p>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col w-3/4 space-y-6">
			<div class="border-2 p-6 rounded-lg space-y-6">
				<div class="flex justify-between items-center">
					<h1 class="font-medium">Trainer</h1>
					<Dialog dialogTitle="Trainer hinzufügen" triggerClassName="p-2.5" triggerVariant="ghost">
						<Button slot="dialogTrigger" variant="ghost">
							<Plus class="stroke-black mr-2 h-4 w-4" />
							Trainer hinzufügen
						</Button>
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
										{#each filteredUsers as user, index (index)}
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<!-- svelte-ignore a11y-no-static-element-interactions -->
											<div
												class="py-1 flex items-center w-full cursor-pointer hover:bg-slate-100 rounded"
											>
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
									</div>
								</div>

								<div class="flex mt-3">
									{#if selectedTrainers.length > 0}
										<div class="flex flex-col space-y-2" transition:slide>
											<div class="">Ausgewählte Benutzer</div>
											<div class="space-x-3">
												{#each selectedTrainers as trainer}
													<Badge variant="secondary">
														{data.users.filter((v) => v.id == trainer)[0].name}
													</Badge>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							</form>
						</div>
						<div slot="dialogFooter">
							<Button
								on:click={() => {
									formElement.submit();
								}}
								type="submit"
							>
								<Plus class="stroke-white mr-2 h-4 w-4" />
								<p>Hinzufügen</p>
							</Button>
						</div>
					</Dialog>
				</div>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>E-Mail</Table.Head>
							<Table.Head>Rolle</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if data?.team.expand}
							{#each data?.team?.expand.trainers as trainer}
								<Table.Row>
									<Table.Cell>{trainer.name}</Table.Cell>
									<Table.Cell>
										<a href={'mailto:' + trainer.email}>{trainer.email}</a>
									</Table.Cell>
									<Table.Cell>
										<Badge variant="secondary">
											{roles.get(trainer.role)}
										</Badge>
									</Table.Cell>
								</Table.Row>
							{/each}
						{:else}
							Keine Trainer vorhanden
						{/if}
					</Table.Body>
				</Table.Root>
			</div>

			<div class="border-2 p-6 rounded-lg space-y-6">
				<div class="flex justify-between items-center">
					<h1 class="font-medium">Trainingszeiten</h1>

					<Dialog
						dialogTitle="Trainingszeit hinzufügen"
						triggerClassName="p-2.5"
						triggerVariant="ghost"
					>
						<Button slot="dialogTrigger" variant="ghost">
							<Plus class="stroke-black mr-2 h-4 w-4" />
							Trainingszeit hinzufügen
						</Button>
						<div slot="dialogContent">
							<form
								class="grid gap-4 py-4"
								bind:this={formElement}
								action="?/createTrainingSchedule"
								method="post"
								use:enhance
							>
								<div class="grid grid-cols-4 items-center gap-4">
									<Label for="day" class="text-right">Trainingstag</Label>
									<Select.Root portal={null}>
										<Select.Trigger class="col-span-3">
											<Select.Value placeholder="Wähle einen Trainingstag aus" />
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												<Select.Label>Wochentag</Select.Label>
												{#each weekdays as weekday}
													<Select.Item value={weekday} label={weekday}>{weekday}</Select.Item>
												{/each}
											</Select.Group>
										</Select.Content>
										<Select.Input name="day" id="day" />
									</Select.Root>
								</div>
								<div class="grid grid-cols-4 items-center gap-4">
									<Label for="description" class="text-right">Zeitraum</Label>

									<div class="col-span-3 flex space-x-3 items-center">
										<Input type="time" name="time_start" value="18:00" class="w-fit" />
										<p class="">bis</p>
										<Input
											type="time"
											name="time_end"
											id="description"
											class="w-fit"
											value="19:00"
										/>
									</div>
								</div>
								<div class="grid grid-cols-4 items-center gap-4">
									<Label for="name" class="text-right">Trainingsort</Label>
									<Input
										name="location"
										placeholder="z.B. Alianz Arena..."
										class="col-span-3"
										value="Alianz Arena"
									/>
								</div>
								<div class="grid grid-cols-4 items-center gap-4">
									<Label for="location_url" class="text-right">Link zum Ort</Label>
									<Input
										type="url"
										name="location_url"
										id="location_url"
										placeholder="z.B. Google Maps Link"
										class="col-span-3"
										value="https://localhost:5173/contact"
									/>
								</div>
							</form>
						</div>
						<div slot="dialogFooter">
							<Button
								on:click={() => {
									formElement.submit();
								}}
								type="submit"
							>
								<Plus class="stroke-white mr-2 h-4 w-4" />
								<p>Hinzufügen</p>
							</Button>
						</div>
					</Dialog>
				</div>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Trainingstag</Table.Head>
							<Table.Head>Trainingsort</Table.Head>
							<Table.Head>Trainingszeit</Table.Head>
							<Table.Head>Aktion</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data?.trainings.items as training}
							<Table.Row>
								<Table.Cell>{training.day}</Table.Cell>
								<Table.Cell>
									<a href={training.location_url}>{training.location_label}</a>
								</Table.Cell>
								<Table.Cell>{training.start} - {training.end} Uhr</Table.Cell>
								<Table.Cell
									><Button variant="ghost" size="icon">
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
									</Button></Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	</div>
</div>
