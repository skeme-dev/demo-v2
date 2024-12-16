<script lang="ts">
	import { buttonVariants } from '$lib/components/dashboard/ui/button/index.js';
	import * as Dialog from '$lib/components/dashboard/ui/dialog/index';

	export let triggerClassName: string = '';
	export let triggerVariant:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| undefined = 'default';
	export let dialogTitle: string = '';
	export let dialogDescription: string = 'Erstelle eine Mannschaft';
	export let dialogContentClassName: string = 'sm:max-w-1/2';
	export let open: boolean = false;
	export let hasTrigger: boolean = true;
</script>

<Dialog.Root closeOnEscape bind:open>
	{#if hasTrigger}
		<Dialog.Trigger
			class={buttonVariants({ variant: triggerVariant, className: triggerClassName })}
		>
			<slot name="dialogTrigger" />
		</Dialog.Trigger>
	{/if}
	<Dialog.Content class={dialogContentClassName}>
		<Dialog.Header>
			<Dialog.Title>{dialogTitle}</Dialog.Title>
			<Dialog.Description>{dialogDescription}</Dialog.Description>
		</Dialog.Header>
		<div class="py-4">
			<slot name="dialogContent" />
		</div>
		<Dialog.Footer>
			<slot name="dialogFooter" />
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
