<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import Button from '../../ui/button/button.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import * as Dialog from '../../ui/dialog/index';
	import Input from '../../ui/input/input.svelte';
	import Label from '../../ui/label/label.svelte';
	import Switch from '../../ui/switch/switch.svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { monthNames, weekdays } from '$lib/utils/calendar';

	export let eventMap;

	let date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth();

	let monthlastdate = new Date(year, month, 0).getDate();

	let currentMonthDays: any[] = [];
	let lastDays: any[] = [];
	let nextDays: any[] = [];

	let arr: any[] = [];
	function renderCalendar() {
		let firstDay = new Date(year, month, 1);
		let lastDay = new Date(year, month + 1, 0);
		let firstDayIndex = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); //4
		let numberOfDays = lastDay.getDate(); //31

		currentMonthDays = [];
		lastDays = [];
		nextDays = [];
		arr = [];

		for (let index = monthlastdate - (firstDayIndex - 1); index < monthlastdate; index++) {
			lastDays.push({ label: index + 1, disabled: true });
		}
		for (let index = 1; index < numberOfDays + 1; index++) {
			currentMonthDays.push({
				label: index,
				value: `${month + 1}.${index}.${year}`,
				disabled: false
			});
		}

		for (let i = 0; i < 7 - lastDay.getDay(); i++) {
			nextDays.push({ label: i + 1, disabled: true });
		}

		arr = [...lastDays, ...currentMonthDays, ...nextDays];
	}

	function nextMonth() {
		month += 1;
		date = new Date(year, month, new Date().getDate());
		year = date.getFullYear();
		month = date.getMonth();
		renderCalendar();
	}

	function prevMonth() {
		month -= 1;
		date = new Date(year, month, new Date().getDate());
		year = date.getFullYear();
		month = date.getMonth();
		renderCalendar();
	}

	renderCalendar();

	function openEventDialog(date: Date) {
		dialogOpen = true;
		selectedDate = date.toLocaleDateString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});

		formattedDate = selectedDate.split('.').reverse().join('-');
	}

	async function handleResponse(res: Response) {
		const data = await res.json();

		if (data.status == 200) {
			console.log('REQUEST: ', data.message);
			dialogOpen = false;
			await invalidateAll();
		} else {
			console.error('Anfrage konntet nicht verarbeitet werden');
			toast.error('Anfrage konntet nicht verarbeitet werden');
		}
	}

	async function createEvent() {
		if (!eventTitle || !eventDescription) {
			return alert('Fülle alle Felder aus.');
		}
		const request = await fetch('/dashboard/events/', {
			method: 'POST',
			body: JSON.stringify({
				id: $page.params.teamId,
				title: eventTitle,
				description: eventDescription,
				date: formattedDate,
				event_start: eventStart ?? false,
				event_end: eventEnd ?? false
			})
		});

		handleResponse(request);
	}

	function getEventsForDate(events: Map<string, any[]>, date: string): any[] {
		const dateParts: string[] = date.split('.');

		const d = `${dateParts[1]}.${dateParts[0]}.${dateParts[2]}`;

		const eventArray: any[] = events.get(d);

		console.log(d);

		if (!eventArray) {
			return [];
		}

		return eventArray;
	}

	let dialogOpen: boolean = false;
	let selectedDate: string | Date;
	let formattedDate: string | Date;

	let error = {};

	let eventTitle: string = 'Test';
	let eventDescription: string = 'test';
	let eventStart: string = '18:00';
	let eventEnd: string = '19:00';
	let includeTime: boolean = true;
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="sm:max-w-[40vw]">
		<Dialog.Header>
			<Dialog.Title>Event erstellen</Dialog.Title>
			<Dialog.Description>Erstelle ein Event für das ausgewählte Datum.</Dialog.Description>
			<div class="grid grid-cols-1 gap-6 pt-6">
				<div class="flex flex-col space-y-3">
					<Label for="event_title">Titel</Label>
					<Input bind:value={eventTitle} name="event_title" />
				</div>
				<div class="flex flex-col space-y-3">
					<Label for="event_title">Beschreibung</Label>
					<Input bind:value={eventDescription} name="event_title" />
				</div>
				<div class="flex flex-col space-y-1">
					<div class="grid grid-cols-3 gap-3">
						<div class="flex flex-col space-y-2">
							<!-- {new Date(selectedDate).toLocaleDateString('de-DE', {
								day: '2-digit',
								month: 'long',
								year: 'numeric'
							})} -->
							<Label>Datum</Label>
							<Input type="date" bind:value={formattedDate} />
						</div>
						<div class="flex flex-col space-y-2">
							<Label>Beginn</Label>
							<Input disabled={!includeTime} bind:value={eventStart} type="time" />
						</div>
						<div class="flex flex-col space-y-2">
							<Label>Ende</Label>
							<Input disabled={!includeTime} bind:value={eventEnd} type="time" />
						</div>
					</div>

					<p class="text-muted-foreground text-sm py-2">
						Das Event findet am {selectedDate.toLocaleString('de-DE', {
							day: '2-digit',
							month: 'narrow',
							year: 'numeric'
						})}
						{#if eventStart && eventEnd}
							von {eventStart} bis {eventEnd} Uhr{/if} statt.
					</p>
					<div class="flex space-x-3 items-center">
						<Switch id="include_time" bind:checked={includeTime} />
						<Label for="include_time">Mit Uhrzeiten</Label>
					</div>
				</div>
			</div>
		</Dialog.Header>
		<Dialog.Footer>
			<Button variant="outline" on:click={() => (dialogOpen = false)}>Abbrechen</Button>
			<Button type="submit" on:click={() => createEvent()}>Event erstellen</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<div class="flex flex-col mt-6 space-y-6">
	<div class="flex justify-start items-center">
		<div class="flex space-x-3 items-center">
			<Button on:click={() => prevMonth()} variant="outline" size="icon">
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<Button on:click={() => nextMonth()} variant="outline" size="icon">
				<ChevronRight class="h-4 w-4" />
			</Button>
		</div>
		<div class="text-lg ml-12">
			{monthNames[month]}
			{year}
		</div>
	</div>
	<!-- Grid layout -->
	<div class="grid grid-cols-7">
		{#each weekdays as weekday, index}
			<div
				class:rounded-l-lg={index == 0}
				class:rounded-r-lg={index == weekdays.length - 1}
				class="font-medium border px-6 py-3 flex items-center justify-center"
			>
				<p>
					{weekday.slice(0, 2)}
				</p>
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-7">
		{#each arr as v, index}
			<button
				disabled={v.disabled}
				on:click={() => openEventDialog(new Date(v.value))}
				class="border flex h-[15vh] w-full"
				class:text-gray-400={v.disabled}
				class:rounded-tl-lg={index == 0}
				class:rounded-tr-lg={index == 6}
				class:rounded-bl-lg={index == arr.length - 7}
				class:rounded-br-lg={index == arr.length - 1}
			>
				<div class="w-full h-full p-6 flex flex-col items-start space-y-2">
					<p>
						{v.label}
					</p>
					{#if !v.disabled}
						{#if getEventsForDate(eventMap, v.value).length > 0}
							{#each getEventsForDate(eventMap, v.value) as event}
								<div
									class="text-xs p-1 bg-orange-200 rounded-md text-[#eb5a23] w-full font-medium text-left"
								>
									{event.title}
								</div>
							{/each}
						{/if}
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>
