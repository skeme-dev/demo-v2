<script>
	import { page } from '$app/stores';
	import { Phone, Search, UserPlus } from 'lucide-svelte';
</script>

{#if !$page.url.pathname.includes('dashboard')}
	{#if !$page.error}
		<div
			class="md:flex hidden fixed flex-col text-white space-y-3 z-10 right-0 top-1/2 -translate-y-1/2 w-[26rem] items-end"
		>
			<div
				class="flex bg-[#de023a] rounded-l p-3 translate-x-[calc(22.5rem)] hover:translate-x-0 transition-transform duration-500 w-full"
			>
				<div class="w-[2rem] flex flex-col items-center justify-center">
					<div class="space-y-2 flex justify-start items-start">
						<p class="py-2 rotated-text font-medium text-center">Mitglied werden</p>
					</div>
					<UserPlus />
				</div>
				<div class="flex flex-1 flex-col justify-center items-center space-y-3">
					<h1 class="font-medium">Werden Sie Mitglied in unserem Sportverein.</h1>
					<a
						href="/service/mitglied-werden"
						class="px-4 border-2 py-2 text-white rounded font-medium w-fit">Mitglied werden</a
					>
				</div>
			</div>
			<div
				class="flex bg-[#de023a] rounded-l p-3 w-2/3 translate-x-[calc(26rem*0.666666-2rem-1.5rem)] hover:translate-x-0 transition-transform duration-500"
			>
				<div class="w-[2rem] flex items-center justify-center">
					<Phone />
				</div>
				<div class="flex flex-1 justify-center items-center">
					<a class="group transition duration-300 font-medium" href="/kontakt">
						So erreichen Sie uns
						<span
							class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"
						/>
					</a>
				</div>
			</div>
			<div
				class="flex bg-[#de023a] rounded-l p-3 w-1/2 translate-x-[calc(26rem*0.5-2rem-1.5rem)] hover:translate-x-0 transition-transform duration-500"
			>
				<div class="w-[2rem] flex items-center justify-center">
					<Search />
				</div>
				<div class="flex flex-1 justify-center items-center">
					<a class="group transition duration-300 font-medium" href="/service/sportsuche">
						Sportsuche
						<span
							class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"
						/>
					</a>
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.rotated-text {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
	}
</style>
