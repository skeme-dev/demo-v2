<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/components/dashboard/utils';
	import { Button } from '$lib/components/dashboard/ui/button';
	import { Calendar } from '$lib/components/dashboard/ui/calendar';
	import * as Popover from '$lib/components/dashboard/ui/popover';

	const df = new DateFormatter('de-DE', {
		dateStyle: 'long'
	});

	export let disabled: boolean | null = false;

	let value: DateValue | undefined = undefined;
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
			builders={[builder]}
			{disabled}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Wähle ein Datum aus'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar locale="de" bind:value initialFocus />
	</Popover.Content>
</Popover.Root>
