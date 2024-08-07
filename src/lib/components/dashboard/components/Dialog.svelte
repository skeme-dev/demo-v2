<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/dashboard/ui/button/index.js';
	import * as Dialog from '$lib/components/dashboard/ui/dialog/index';

	export let triggerClassName = '';
	export let triggerVariant:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| undefined;
	export let dialogTitle = '';
	export let dialogDescription = 'Erstelle eine Mannschaft';
</script>

<Dialog.Root closeOnEscape>
	<Dialog.Trigger class={buttonVariants({ variant: triggerVariant, className: triggerClassName })}>
		<slot name="dialogTrigger" />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-1/2">
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
