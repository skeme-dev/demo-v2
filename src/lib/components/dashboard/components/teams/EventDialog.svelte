<script lang="ts">
	import Dialog from '$lib/components/dashboard/components/Dialog.svelte';
	import Button from '../../ui/button/button.svelte';
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { DateFormatter, getLocalTimeZone, Time, today } from '@internationalized/date';
	import * as Calendar from '../../ui/calendar/index';
	import * as Select from '../../ui/select/index';
	import { cn } from '../../utils';
	import Label from '../../ui/label/label.svelte';
	import Input from '../../ui/input/input.svelte';

	let value = undefined;
	let placeholder = today(getLocalTimeZone());
	let weekdayFormat: 'short' | 'long' | 'narrow' | undefined = 'short';

	let eventTitle: string;
	let eventDescription: string;
	let eventStart: string;
	let eventEnd: string;

	const monthOptions = [
		'Januar',
		'Februar',
		'März',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Dezember'
	].map((month, i) => ({ value: i + 1, label: month }));

	const weekdays: string[] = [
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag',
		'Sonntag'
	];

	const monthFmt = new DateFormatter('de-DE', {
		month: 'long'
	});

	const yearOptions = Array.from({ length: 20 }, (_, i) => ({
		label: String(new Date().getFullYear() + i),
		value: new Date().getFullYear() + i
	}));

	$: defaultYear = placeholder
		? {
				value: placeholder.year,
				label: String(placeholder.year)
			}
		: undefined;

	$: defaultMonth = placeholder
		? {
				value: placeholder.month,
				label: monthFmt.format(placeholder.toDate(getLocalTimeZone()))
			}
		: undefined;

	export let dialogOpen: boolean = false;

	$: console.log(value);
</script>

<Dialog
	hasTrigger={false}
	bind:open={dialogOpen}
	dialogTitle="Event erstellen"
	triggerClassName="p-2.5"
	dialogContentClassName="max-w-[60%]"
>
	<div slot="dialogContent">
		<div class="flex w-full space-x-12">
			<div class="w-1/2">
				<!-- {#if value} -->
				<div class="grid gap-6">
					<div class="flex flex-col space-y-2">
						<Label>Titel</Label>
						<Input bind:value={eventTitle} />
					</div>

					<div class="flex flex-col space-y-2">
						<Label>Description</Label>
						<Input bind:value={eventDescription} />
					</div>

					<div class="flex flex-col space-y-2">
						<Label>Datum</Label>

						<!-- <Input bind:value /> -->
					</div>

					<div class="flex space-x-6">
						<div class="flex items-center">
							<Label>Beginn</Label>
						</div>
						<Input type="time" bind:value={eventStart} />
						<div class="flex items-center">
							<Label>Ende</Label>
						</div>
						<Input type="time" bind:value={eventEnd} />
					</div>
				</div>
				<!-- {/if} -->
			</div>
			<div class="w-1/2">
				<CalendarPrimitive.Root
					weekStartsOn={1}
					{weekdayFormat}
					on:keydown
					let:months
					bind:value
					bind:placeholder
				>
					<Calendar.Header>
						<Calendar.Heading class="flex w-full items-center justify-between gap-2">
							<Select.Root
								selected={defaultMonth}
								items={monthOptions}
								onSelectedChange={(v) => {
									if (!v || !placeholder) return;
									if (v.value === placeholder?.month) return;
									placeholder = placeholder.set({ month: v.value });
								}}
							>
								<Select.Trigger aria-label="Select month" class="w-[60%]">
									<Select.Value placeholder="Select month" />
								</Select.Trigger>
								<Select.Content class="max-h-[200px] overflow-y-auto">
									{#each monthOptions as { value, label }}
										<Select.Item {value} {label}>
											{label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<Select.Root
								selected={defaultYear}
								items={yearOptions}
								onSelectedChange={(v) => {
									if (!v || !placeholder) return;
									if (v.value === placeholder?.year) return;
									placeholder = placeholder.set({ year: v.value });
								}}
							>
								<Select.Trigger aria-label="Select year" class="w-[40%]">
									<Select.Value placeholder="Select year" />
								</Select.Trigger>
								<Select.Content class="max-h-[200px] overflow-y-auto">
									{#each yearOptions as { value, label }}
										<Select.Item {value} {label}>
											{label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</Calendar.Heading>
					</Calendar.Header>
					<Calendar.Months>
						{#each months as month}
							<Calendar.Grid>
								<Calendar.GridHead>
									<Calendar.GridRow class="flex">
										{#each weekdays as weekday}
											<Calendar.HeadCell>
												{weekday.slice(0, 2)}
											</Calendar.HeadCell>
										{/each}
									</Calendar.GridRow>
								</Calendar.GridHead>
								<Calendar.GridBody>
									{#each month.weeks as weekDates}
										<Calendar.GridRow class="mt-2 w-full">
											{#each weekDates as date}
												<Calendar.Cell {date}>
													<Calendar.Day {date} month={month.value} />
												</Calendar.Cell>
											{/each}
										</Calendar.GridRow>
									{/each}
								</Calendar.GridBody>
							</Calendar.Grid>
						{/each}
					</Calendar.Months>
				</CalendarPrimitive.Root>
			</div>
		</div>
	</div>
	<div class="" slot="dialogFooter">
		<Button type="submit">Erstellen</Button>
	</div>
</Dialog>
