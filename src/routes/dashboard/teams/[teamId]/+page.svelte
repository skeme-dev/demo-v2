<script lang="ts">
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import type { PageData } from './$types';
	import * as Table from '$lib/components/dashboard/ui/table';
	import Badge from '$lib/components/dashboard/ui/badge/badge.svelte';
	import { Clock, Pencil, Plus, Trash2 } from 'lucide-svelte';
	import * as AlertDialog from '$lib/components/dashboard/ui/alert-dialog';
	import Dialog from '$lib/components/dashboard/components/Dialog.svelte';
	import Label from '$lib/components/dashboard/ui/label/label.svelte';
	import Input from '$lib/components/dashboard/ui/input/input.svelte';
	import * as Select from '$lib/components/dashboard/ui/select/index';
	import { enhance } from '$app/forms';
	import { roles } from '$lib/components/dashboard/roles';
	import { slide } from 'svelte/transition';
	import { Separator } from '$lib/components/dashboard/ui/separator';
	import EventDialog from '$lib/components/dashboard/components/teams/EventDialog.svelte';
	import Scheduler from '$lib/components/dashboard/components/teams/Scheduler.svelte';
	import { monthNames, weekdays } from '$lib/utils/calendar';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let searchTerm: string = '';

	$: filteredUsers = data.users.filter(
		(user) => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let selectedTrainers: any[] = [];
	let formElement: HTMLFormElement;
	let eventDialogOpen: boolean = false;

	const formatter = new Intl.DateTimeFormat('de-DE', { timeStyle: 'short' });
	const formatter2 = new Intl.DateTimeFormat('de-DE', {
		month: 'short',
		day: '2-digit'
	});

	// input format: DD.MM.YYYY
	// output format: DD. [MONTH_SHORT]
	function format2(str: string) {
		const parts = str.split('.');
		const day = parts[0];
		const month = Number(parts[1]);
		const monthName = monthNames[month - 1];

		const d = new Date(parts[2], parts[1] - 1, parts[0]);

		return { dateString: `${day}. ${monthName.slice(0, 3)}`, weekday: weekdays[d.getDay() - 1] };
	}

	// compare and format dates for event card
	// function compareAndFormat(d1: Date, d2: Date) {
	// 	const t1 = new Date(d1.toLocaleDateString()).getTime();
	// 	const t2 = new Date(d2.toLocaleDateString()).getTime();

	// 	if (d1.toLocaleDateString() == d2.toLocaleDateString()) {
	// 		return formatter.format(d1);
	// 	} else {
	// 		return `${formatter.format(d1)} - ${formatter.format(d2)}`;
	// 	}
	// }

	function sortDates(date1: string | Date, date2: string | Date) {
		const d1 = new Date(date1);
		const d2 = new Date(date2);

		return d1 - d2;
	}

	const m = new Map<string, any[]>();

	function getEventMap(events: any[]) {
		for (const ev of events) {
			const dateObj = new Date(ev.event_start);
			const date = dateObj.toLocaleDateString();

			if (m.has(date)) {
				m.set(date, [...m.get(date), ev]);
			} else {
				m.set(date, [ev]);
			}
		}
	}

	getEventMap(data.events.items);

	function sortEventMap(m: Map<string, any[]>) {
		const marray = [...m];
		marray.sort((a, b) => sortDates(a[0], b[0]));
		console.log(marray);
	}

	console.log(sortEventMap(m));

	$: if (data.events) {
		getEventMap(data.events.items);
	}

	// Object.keys(obj).forEach((el) => {
	// 	console.log(el);
	// });

	// Object.entries(obj).forEach((el) => {
	// 	console.log(el);
	// });

	async function deleteEvent(eventId: string) {
		const req = await fetch('/dashboard/events/', {
			method: 'DELETE',
			body: JSON.stringify({ id: eventId })
		});

		const data = await req.json();

		if (data.code == 200) {
			console.log('testttt');
			await invalidateAll();
		} else if (data.code == 400) {
			toast.error('Beim Löschen ist ein Fehler aufgetreten.');
		} else if (data.code == 404) {
			toast.error('Der Bericht konnte nicht gefunden werden.');
		}
	}

	let eventToDelete: string = '';
	let deleteEventDialogOpen: boolean = false;
</script>

<AlertDialog.Root bind:open={deleteEventDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Bist du sicher?</AlertDialog.Title>
			<AlertDialog.Description>
				Das Löschen eines Events kann nicht mehr rückgängig gemacht werden. Die Daten des Events
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
						deleteEvent(eventToDelete);
					}}>Löschen</Button
				>
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<div class="flex flex-col w-full space-y-6">
	<div class="flex flex-col space-y-3">
		<h1 class="text-3xl font-semibold">Teams</h1>
		<h3 class="font-medium text-gray-500">Verwalte dein Team</h3>
	</div>
	<div class="flex space-x-12 !mb-8">
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
	<div class="flex flex-col">
		<div class="flex justify-between items-center">
			<div class="flex flex-col space-y-3">
				<h1 class="text-lg font-medium">Events</h1>
			</div>
			<!-- <Button
				on:click={() => {
					eventDialogOpen = true;
				}}
			>
				<Plus class="stroke-white mr-2 h-4 w-4" />
				Event hinzufügen
			</Button>
			<EventDialog bind:dialogOpen={eventDialogOpen} />
		 -->
		</div>
		<Separator class="mt-3" />

		<Scheduler eventMap={m} />
		<h2 class="mt-8 mb-3 font-medium">Alle Events</h2>
		<div class="flex flex-col space-y-3">
			<!-- {#each data.events.items as event}
				<div class="flex space-x-6 rounded-md p-6 border-2">
					<div class="w-[5%] flex items-center justify-center">
						<CalendarClock />
					</div>
					<div class="w-[95%]">
						<div class="grid grid-cols-5">
							<div class="flex items-center col-span-2">
								<h1 class="text-lg font-medium">{event.title}</h1>
							</div>
							<div class="flex justify-center items-center col-span-2">
								<div class="flex space-x-6">
									<div class="flex flex-col space-y-1">
										<p class="text-sm font-medium">Von</p>
										<Badge variant="secondary">
											{formatter.format(new Date(event.event_start))} Uhr
										</Badge>
									</div>
									<div class="flex flex-col space-y-1">
										<p class="text-sm font-medium">Bis</p>
										<Badge variant="secondary">
											{formatter.format(new Date(event.event_end))} Uhr
										</Badge>
									</div>
								</div>
							</div>
							<div class="flex justify-end items-center">
								<Button variant="ghost" size="icon">
									<Pen class="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon">
									<ChevronDown class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			{/each} -->
			{#each [...m] as [key, value]}
				<div class="flex space-x-3">
					<div class="flex w-[15%] h-full bg-gray-100 p-6 rounded-lg">
						<div class="flex flex-col space-y-2">
							<span class="text-xl font-medium">
								{format2(key).dateString}
							</span>
							<span class="text-gray-500 text-sm font-medium">{format2(key).weekday}</span>
						</div>
					</div>
					<div class="flex flex-1 flex-col" class:space-y-3={value.length > 1}>
						{#each value as val}
							<div
								class:h-full={value.length == 1}
								class="flex items-center col-span-6 border-2 rounded-lg py-6 pr-6 pl-4"
							>
								<div class="w-1 h-full bg-[#eb5a23] rounded-full mr-3"></div>
								<div class="flex flex-col space-y-1">
									<h1 class="text-lg font-semibold">{val.title}</h1>
									<div class="flex space-x-6">
										<p class="text-sm">
											{val.description}
										</p>
										<div class="flex items-center space-x-2">
											<Clock class="w-4 h-4" />
											<div class="text-sm">
												{formatter.format(new Date(val.event_start))} - {formatter.format(
													new Date(val.event_end)
												)} Uhr
											</div>
										</div>
									</div>
								</div>

								<div class="ml-auto flex space-x-3">
									<Button size="icon" variant="outline">
										<Pencil class="w-4 h-4" />
									</Button>
									<Button
										on:click={() => {
											eventToDelete = val.id;
											deleteEventDialogOpen = true;
										}}
										size="icon"
										variant="outline"
									>
										<Trash2 class="w-4 h-4" />
									</Button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
