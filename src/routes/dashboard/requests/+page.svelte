<script lang="ts">
	import * as Tabs from '$lib/components/dashboard/ui/tabs';
	import { Plus, Trash2 } from 'lucide-svelte';
	import { Label } from "$lib/components/dashboard/ui/label";
	import { Switch } from "$lib/components/dashboard/ui/switch";
	import type { PageData } from '../$types';
	import { toast } from 'svelte-sonner';


	export let data: PageData;

	function formatDateDifference(date1, date2 = new Date()) {
		const msPerMinute = 60 * 1000;
		const msPerHour = msPerMinute * 60;
		const msPerDay = msPerHour * 24;
		const msPerMonth = msPerDay * 30; // ca.
		const msPerYear = msPerDay * 365; // ca.

		const diff = date2 - date1; // Differenz in Millisekunden

		if (diff < msPerMinute) {
			return `vor ${Math.floor(diff / 1000)} Sekunden`;
		} else if (diff < msPerHour) {
			return `vor ${Math.floor(diff / msPerMinute)} Minuten`;
		} else if (diff < msPerDay) {
			return `vor ${Math.floor(diff / msPerHour)} Stunden`;
		} else if (diff < msPerMonth) {
			return `vor ${Math.floor(diff / msPerDay)} Tagen`;
		} else if (diff < msPerYear) {
			return `vor ${Math.floor(diff / msPerMonth)} Monaten`;
		} else {
			return `vor ${Math.floor(diff / msPerYear)} Jahren`;
		}
	}

	function formatDate(d) {
		const date = new Date(d);

		return date.toLocaleDateString('de-DE', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			minute: 'numeric',
			hour: 'numeric',
		});
	}

	let reqs = data.requests;

	let currentRequest = data.requests[0];

	async function mark(requestId: string, v: boolean = true) {
		const formData = new FormData();
		formData.append('requestId', requestId);
		formData.append("reviewed", v);
		const request = await fetch("?/markAsReviewed", { method: "POST", body: formData });

		const response = await request.json();

		console.log(response);

		if (response.status == 200) {
			return {error: false};
		}

		toast.error("Beim Aktualisieren ist etwas schiefgangen.")
		return {error: true};
	}

	$: console.log(currentRequest?.reviewed);

</script>

<div class="flex flex-col w-full">
	<div class="flex justify-between items-center">
		<div class="flex flex-col space-y-3">
			<h1 class="text-3xl font-semibold">Anfragen</h1>
			<h3 class="font-medium text-gray-500">Beantworte die eingegangen Kontaktanfragen</h3>
		</div>
<!--		<Button>-->
<!--			<Plus class="stroke-white mr-2 h-4 w-4" />-->
<!--			Benutzer hinzufügen-->
<!--		</Button>-->
	</div>

	{#if data.requests.length > 0}
		<div class="flex mt-6 space-x-6 h-full">
			<div class="flex flex-col space-y-3 w-2/5">
				<Tabs.Root value="all" class="ml-auto">
					<Tabs.List>
						<Tabs.Trigger value="all" on:click={() => (reqs = data.requests)}>Alle</Tabs.Trigger>
						<Tabs.Trigger value="unreviewed" on:click={() => (reqs = data.requests.filter(v => {
						console.log(v)
						return !v.reviewed;
					}))}>Ungelesen</Tabs.Trigger>
					</Tabs.List>
				</Tabs.Root>
				{#each reqs as request}
					<button on:click={() => (currentRequest = request)} class="text-sm border rounded-lg hover:bg-accent p-3">
						<div class="flex items-center mb-1">
							<div class="flex items-center">
								<span class="font-semibold">{request.name}</span>
								{#if !request.reviewed}
									<span class="flex h-2 w-2 rounded-full bg-blue-600 ml-2"></span>
								{/if}
							</div>
							<span class="ml-auto text-xs">{formatDateDifference(new Date(request.created))}</span>
						</div>
						<div class="text-xs font-medium text-left mb-2">
							{request.email}
						</div>
						<div class="text-left text-muted-foreground line-clamp-2 text-xs">{request.message}</div>
					</button>
				{/each}
			</div>
			<div class="flex flex-col w-3/5 border rounded-lg">
				<div class="p-6 border-b flex flex-col space-y-1 text-sm">
					<div class="flex items-center">
						<div class="">
							<span class="font-semibold">Von: </span>
							{currentRequest.name}
						</div>
						<div class="ml-auto">{formatDate(currentRequest.created)}</div>
					</div>
					<div class="text-xs">
						<span class="font-semibold">E-Mail: </span>
						{currentRequest.email}
					</div>
					{#if currentRequest.company !== ""}
						<div class="text-xs">
							<span class="font-semibold">Firma: </span>
							{currentRequest.company}
						</div>
					{/if}
				</div>
				<div class="flex flex-1 h-max text-xs p-6">
					{currentRequest.message}
				</div>
				<div class="border-t p-6 h-fit w-full">
					<div class="ml-auto w-fit flex items-center space-x-3">
						<input class="hidden" type="text" value={currentRequest.id} />
						<Label for="markAsReviewed">Als gelesen markieren</Label>
						<Switch bind:checked={currentRequest.reviewed} on:click={async (e) => {
						const oldValue = currentRequest.reviewed;
						currentRequest.reviewed = !currentRequest.reviewed;

						const i = reqs.indexOf(currentRequest);
						reqs[i].reviewed = currentRequest.reviewed;

						const res = await mark(currentRequest.id, currentRequest.reviewed);

						if (res.error) {
							reqs[i].reviewed = oldValue;
						}
					}} id="markAsReviewed" />
					</div>
				</div>
			</div>

		</div>
	{:else}
		<p class="text-muted-foreground">Es wurden keine Anfragen gefunden.</p>
	{/if}
</div>