<script lang="ts">
	import Button from '$lib/components/dashboard/ui/button/button.svelte';
	import type { PageData } from './$types';
	import * as Table from '$lib/components/dashboard/ui/table';
	import Badge from '$lib/components/dashboard/ui/badge/badge.svelte';
	import { Clock, Pencil, PencilOff, Plus, Trash2 } from 'lucide-svelte';
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
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import UserDialog from '$lib/components/dashboard/components/UserDialog.svelte';
	import { page } from '$app/stores';

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

	const dayMap = {
		Montag: 1,
		Dienstag: 2,
		Mittwoch: 4,
		Donnerstag: 5,
		Freitag: 6,
		Samstag: 7,
		Sonntag: 8
	};

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

	$: if (data.events) {
		getEventMap(data.events.items);
	}

	async function deleteEvent(eventId: string) {
		const req = await fetch('/dashboard/events/', {
			method: 'DELETE',
			body: JSON.stringify({ id: eventId })
		});

		const data = await req.json();

		if (data.code == 200) {
			await invalidateAll();
		} else if (data.code == 400) {
			toast.error('Beim Löschen ist ein Fehler aufgetreten.');
		} else if (data.code == 404) {
			toast.error('Der Bericht konnte nicht gefunden werden.');
		}
	}

	async function deleteTrainer(id: string) {
		const form = new FormData();

		form.append('trainerId', id);

		const response = await fetch('/dashboard/teams/' + $page.params.teamId + '?/deleteTrainer', {
			method: 'POST',
			body: form
		});

		response.json().then(async (v) => {
			if (v.type == 'success') {
				toast.success('Änderungen wurden erfolgreich gespeichert');
				await invalidateAll();
			} else {
				toast.error('Änderungen konnten nicht gespeichert werden');
			}
		});
	}

	async function deleteTrainingSchedule(id: string) {
		const form = new FormData();

		form.append('trainingScheduleId', id);

		const response = await fetch(
			'/dashboard/teams/' + $page.params.teamId + '?/deleteTrainingSchedule',
			{
				method: 'POST',
				body: form
			}
		);

		response.json().then(async (v) => {
			if (v.type == 'success') {
				toast.success('Änderungen wurden erfolgreich gespeichert');
				await invalidateAll();
			} else {
				toast.error('Änderungen konnten nicht gespeichert werden');
			}
		});
	}

	async function deleteTeam() {
		const form = new FormData();
		form.append('teamId', $page.params.teamId);

		const response = await fetch('/dashboard/teams?/deleteTeam', {
			method: 'POST',
			body: form
		});

		response.json().then((v) => {
			if (v.type == 'success') {
				goto('/dashboard/departments/');
			} else {
				toast.error('Änderungen konnten nicht gespeichert werden');
			}
		});
	}

	async function updateTeam(
		id: string = $page.params.teamId,
		title?: string | null,
		description?: string | null,
		teamImage: File | null
	) {
		let updateObject: any = {};

		// check if values were changed
		if (title && title != data.team.title) {
			console.log('label has changed');
			updateObject['title'] = title;
		}

		if (description && description != data.team.description) {
			console.log('description has changed');
			updateObject['description'] = description;
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
			teamNameEdit = false;
			teamDescriptionEdit = false;
			await invalidateAll();
		} else {
			console.error('Anfrage konntet nicht verarbeitet werden');
			toast.error('Anfrage konnte nicht verarbeitet werden');
		}
	}

	let eventToDelete: string = '';
	let createTrainerDialogOpen: boolean = false;
	let createTrainingScheduleOpen: boolean = false;

	let deleteTeamDialogOpen: boolean = false;
	let deleteEventDialogOpen: boolean = false;

	let currentTeamName: string = data.team.title;
	let currentTeamDescription: string = data.team.description;

	let teamNameEdit: boolean = false;
	let teamDescriptionEdit: boolean = false;
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

<AlertDialog.Root bind:open={deleteTeamDialogOpen}>
	<AlertDialog.Trigger />
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Team löschen</AlertDialog.Title>
			<AlertDialog.Description>
				Das Löschen dieses Teams kann nicht mehr rückgängig gemacht werden.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Abbrechen</AlertDialog.Cancel>
			<AlertDialog.Action asChild let:builder>
				<Button
					on:click={() => {
						deleteTeam();
					}}
					builders={[builder]}
					variant="destructive">Löschen</Button
				>
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<div class="flex flex-col w-full space-y-6 mb-6 h-fit">
	<div class="flex justify-between items-center">
		<div class="flex flex-col space-y-3 mb-8">
			<h1 class="text-3xl font-semibold">Teams</h1>
			<h3 class="font-medium text-gray-500">Verwalte dein Team</h3>
		</div>
		<div class="">
			<Button
				variant="destructive"
				size="icon"
				on:click={() => {
					deleteTeamDialogOpen = true;
				}}
			>
				<Trash2 size={16} />
			</Button>
		</div>
	</div>
	<div class="space-y-12">
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Mannschaftsname</h1>
			</div>
			<div class="w-3/5 grid grid-cols-2 gap-6">
				{#if teamNameEdit}
					<div class="flex space-x-3" in:slide>
						<Input bind:value={currentTeamName} type="text" />
						<!-- <Textarea bind:value={currentDescription} /> -->
						<Button
							on:click={() => {
								// updateDepartment(data.department.id, null, currentDescription, selectedUser);
							}}>Speichern</Button
						>
					</div>
				{:else}
					<p class="flex items-center p-2" in:slide>
						{data.team.title}
					</p>
				{/if}
			</div>
			<div class="w-1/12 flex flex-col space-y-3 justify-start items-end">
				<Button on:click={() => (teamNameEdit = !teamNameEdit)} variant="outline" size="icon">
					{#if !teamNameEdit}
						<Pencil size={16} />
					{:else}
						<PencilOff size={16} />
					{/if}
				</Button>
			</div>
		</div>
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Beschreibung</h1>
			</div>
			<div class="w-3/5 grid grid-cols-2 gap-6">
				{#if teamDescriptionEdit}
					<div class="flex space-x-3" in:slide>
						<Input bind:value={currentTeamDescription} type="text" />
						<!-- <Textarea bind:value={currentDescription} /> -->
						<Button
							on:click={() => {
								// updateDepartment(data.department.id, null, currentDescription, selectedUser);
							}}>Speichern</Button
						>
					</div>
				{:else}
					<p class="flex items-center p-2" in:slide>
						{data.team.description}
					</p>
				{/if}
			</div>
			<div class="w-1/12 flex flex-col space-y-3 justify-start items-end">
				<Button
					on:click={() => (teamDescriptionEdit = !teamDescriptionEdit)}
					variant="outline"
					size="icon"
				>
					{#if !teamDescriptionEdit}
						<Pencil size={16} />
					{:else}
						<PencilOff size={16} />
					{/if}
				</Button>
			</div>
		</div>
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Teambild</h1>
			</div>
			<div class="w-3/5 grid grid-cols-2 gap-6">Hier soll mal ein Bild angezeigt werden</div>
			<div class="w-1/12 flex flex-col space-y-3 justify-start items-end">
				<Button variant="outline" size="icon">
					<Pencil size={16} />
				</Button>
			</div>
		</div>
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Trainer</h1>
			</div>
			<div class="w-3/5 grid grid-cols-2 gap-6">
				{#if data?.team?.expand.trainers}
					{#each data?.team?.expand.trainers as trainer}
						<div class="flex justify-between items-center border-2 p-3 rounded-lg">
							<div class="flex flex-col space-y-3">
								<Badge class="w-fit" variant="outline">
									{#if trainer.role == 'TRAINER'}
										Trainer
									{:else if trainer.role == 'ADMINISTRATOR'}
										Administrator
									{:else}
										Benutzer
									{/if}
								</Badge>
								<span class="text-lg font-medium">
									{trainer.name}
								</span>
							</div>
							<Button on:click={() => deleteTrainer(trainer.id)} size="icon" variant="ghost">
								<Trash2 size={16} />
							</Button>
						</div>
					{/each}
				{:else}
					<p class="text-sm font-medium text-gray-600">Keine Trainer vorhanden.</p>
				{/if}
			</div>
			<div class="w-1/12 flex flex-col space-y-3 justify-start items-end">
				<Button on:click={() => (createTrainerDialogOpen = true)} size="icon">
					<Plus size={16} />
				</Button>
				<Dialog
					hasTrigger={false}
					dialogTitle="Trainer hinzufügen"
					bind:open={createTrainerDialogOpen}
				>
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
		</div>
		<div class="flex w-full border-t-2 pt-6">
			<div class="w-1/3">
				<h1 class="font-medium text-lg">Trainingszeiten</h1>
			</div>
			<div class="w-3/5 grid grid-cols-2 gap-6">
				{#if data.trainings.items.length > 0}
					{#each data?.trainings.items.sort((a, b) => {
						return dayMap[a.day] - dayMap[b.day];
					}) as training}
						<div class="border-2 p-6 rounded-lg">
							<div class="flex flex-col space-y-3">
								<div class="flex justify-between items-center">
									<span class="font-medium text-lg">
										{training.day}
									</span>
									<Button
										on:click={() => {
											deleteTrainingSchedule(training.id);
										}}
										size="icon"
										variant="ghost"
									>
										<Trash2 size={16} />
									</Button>
								</div>
								<div class="flex space-x-3 items-center">
									<span class="text-xs">{training.start} - {training.end} Uhr</span>
									<span class="w-1 h-1 bg-black rounded-full"></span>
									<a class="text-xs" href={training.location_url}>{training.location_label}</a>
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<p class="text-sm font-medium text-gray-600">Keine Trainingszeiten vorhanden.</p>
				{/if}
			</div>
			<div class="w-1/12 flex flex-col space-y-3 justify-start items-end">
				<Button on:click={() => (createTrainingScheduleOpen = true)} size="icon">
					<Plus size={16} />
				</Button>

				<Dialog
					hasTrigger={false}
					dialogTitle="Trainingszeit hinzufügen"
					dialogDescription="Erstelle eine Trainingszeit für deine Mannschaft."
					bind:open={createTrainingScheduleOpen}
				>
					<div slot="dialogContent">
						<form
							class="grid gap-4 py-4"
							bind:this={formElement}
							action="?/createTrainingSchedule"
							method="post"
							use:enhance={() => {
								return ({ update }) => {
									createTrainingScheduleOpen = false;
									update({ invalidateAll: true });
								};
							}}
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
									<Input type="time" name="time_end" id="description" class="w-fit" value="19:00" />
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
				<Button disabled={!data.team.expand.training_schedule} variant="outline" size="icon">
					<Pencil size={16} />
				</Button>
			</div>
		</div>
	</div>

<!--	<div class="flex flex-col">-->
<!--		<div class="flex justify-between items-center">-->
<!--			<div class="flex flex-col space-y-3">-->
<!--				<h1 class="text-lg font-medium">Events</h1>-->
<!--			</div>-->
<!--			&lt;!&ndash; <Button-->
<!--				on:click={() => {-->
<!--					eventDialogOpen = true;-->
<!--				}}-->
<!--			>-->
<!--				<Plus class="stroke-white mr-2 h-4 w-4" />-->
<!--				Event hinzufügen-->
<!--			</Button>-->
<!--			<EventDialog bind:dialogOpen={eventDialogOpen} />-->
<!--		 &ndash;&gt;-->
<!--		</div>-->
<!--		<Separator class="mt-3" />-->

<!--		<Scheduler eventMap={m} />-->
<!--		<h2 class="mt-8 mb-3 font-medium">Alle Events</h2>-->
<!--		<div class="flex flex-col space-y-3">-->
<!--			&lt;!&ndash; {#each data.events.items as event}-->
<!--				<div class="flex space-x-6 rounded-md p-6 border-2">-->
<!--					<div class="w-[5%] flex items-center justify-center">-->
<!--						<CalendarClock />-->
<!--					</div>-->
<!--					<div class="w-[95%]">-->
<!--						<div class="grid grid-cols-5">-->
<!--							<div class="flex items-center col-span-2">-->
<!--								<h1 class="text-lg font-medium">{event.title}</h1>-->
<!--							</div>-->
<!--							<div class="flex justify-center items-center col-span-2">-->
<!--								<div class="flex space-x-6">-->
<!--									<div class="flex flex-col space-y-1">-->
<!--										<p class="text-sm font-medium">Von</p>-->
<!--										<Badge variant="secondary">-->
<!--											{formatter.format(new Date(event.event_start))} Uhr-->
<!--										</Badge>-->
<!--									</div>-->
<!--									<div class="flex flex-col space-y-1">-->
<!--										<p class="text-sm font-medium">Bis</p>-->
<!--										<Badge variant="secondary">-->
<!--											{formatter.format(new Date(event.event_end))} Uhr-->
<!--										</Badge>-->
<!--									</div>-->
<!--								</div>-->
<!--							</div>-->
<!--							<div class="flex justify-end items-center">-->
<!--								<Button variant="ghost" size="icon">-->
<!--									<Pen class="h-4 w-4" />-->
<!--								</Button>-->
<!--								<Button variant="ghost" size="icon">-->
<!--									<ChevronDown class="h-4 w-4" />-->
<!--								</Button>-->
<!--							</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			{/each} &ndash;&gt;-->
<!--			{#each [...m] as [key, value]}-->
<!--				<div class="flex space-x-3">-->
<!--					<div class="flex w-[15%] h-full bg-gray-100 p-6 rounded-lg">-->
<!--						<div class="flex flex-col space-y-2">-->
<!--							<span class="text-xl font-medium">-->
<!--								{format2(key).dateString}-->
<!--							</span>-->
<!--							<span class="text-gray-500 text-sm font-medium">{format2(key).weekday}</span>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="flex flex-1 flex-col" class:space-y-3={value.length > 1}>-->
<!--						{#each value as val}-->
<!--							<div-->
<!--								class:h-full={value.length == 1}-->
<!--								class="flex items-center col-span-6 border-2 rounded-lg py-6 pr-6 pl-4"-->
<!--							>-->
<!--								<div class="w-1 h-full bg-[#eb5a23] rounded-full mr-3"></div>-->
<!--								<div class="flex flex-col space-y-1">-->
<!--									<h1 class="text-lg font-semibold">{val.title}</h1>-->
<!--									<div class="flex space-x-6">-->
<!--										<p class="text-sm">-->
<!--											{val.description}-->
<!--										</p>-->
<!--										<div class="flex items-center space-x-2">-->
<!--											<Clock class="w-4 h-4" />-->
<!--											<div class="text-sm">-->
<!--												{formatter.format(new Date(val.event_start))} - {formatter.format(-->
<!--													new Date(val.event_end)-->
<!--												)} Uhr-->
<!--											</div>-->
<!--										</div>-->
<!--									</div>-->
<!--								</div>-->

<!--								<div class="ml-auto flex space-x-3">-->
<!--									<Button size="icon" variant="outline">-->
<!--										<Pencil class="w-4 h-4" />-->
<!--									</Button>-->
<!--									<Button-->
<!--										on:click={() => {-->
<!--											eventToDelete = val.id;-->
<!--											deleteEventDialogOpen = true;-->
<!--										}}-->
<!--										size="icon"-->
<!--										variant="outline"-->
<!--									>-->
<!--										<Trash2 class="w-4 h-4" />-->
<!--									</Button>-->
<!--								</div>-->
<!--							</div>-->
<!--						{/each}-->
<!--					</div>-->
<!--				</div>-->
<!--			{/each}-->
<!--		</div>-->
<!--	</div>-->
</div>
