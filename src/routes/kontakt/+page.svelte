<script lang="ts">
	import SuccessPopup from '$lib/components/SuccessPopup.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let form;
	let showModal = false;

	onMount(() => {
		if (form?.success) {
			showModal = true;
		}
	});
</script>

<div class="w-full flex flex-col space-y-6">
	<h1 class="text-4xl font-semibold">Kontakt</h1>
	<div class="w-full flex md:flex-row flex-col">
		<div class="flex flex-col space-y-3 w-full">
			<h2 class="text-2xl font-semibold">SV Koweg Görlitz e.V.</h2>
			<p class="text-lg">Max Mustermann</p>
			<div class="text-lg flex flex-col">
				<p>Diesterwegplatz 8</p>
				<p>02827 Görlitz</p>
			</div>
		</div>
		<div class="flex flex-col w-full md:mt-0 mt-6">
			<div class="w-full bg-accent p-6 rounded flex flex-col space-y-6">
				<h2 class="text-white text-xl font-medium">Anfahrt</h2>
				<!-- svelte-ignore a11y-missing-attribute -->
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d312.8972399191981!2d14.942263895994648!3d51.14207007752706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4708ddd8ce75251f%3A0xda2bbd1bf11fe08b!2sSportverein%20Koweg%20G%C3%B6rlitz%20e.V.!5e0!3m2!1sde!2sde!4v1697990919400!5m2!1sde!2sde"
					height="250"
					class="rounded"
					style="border:0;"
					allowfullscreen
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				/>
			</div>
		</div>
	</div>
	<div class="mt-12 pt-12 flex flex-col space-y-2">
		<h1 class="uppercase text-2xl font-semibold mb-6">Unser Kontaktformular</h1>
		<form class="space-y-6" method="POST" action="?/sendContactForm">
			<div class="flex flex-col space-y-2">
				<label class="text-lg font-semibold" for="company">Firma</label>
				<input class="px-3 py-2 rounded border" type="text" name="company" />
			</div>
			<div class="flex md:flex-row flex-col w-full md:space-x-6 md:space-y-0 space-y-6">
				<div class="w-full flex flex-col space-y-2">
					<label class="text-lg font-semibold" for="salutation">Anrede*</label>
					<select class="px-3 py-2 rounded border" required name="salutation">
						<option value="female">Frau</option>
						<option value="male">Herr</option>
						<option value="divers">Divers</option>
					</select>
				</div>
				<div class="w-full flex flex-col space-y-2">
					<label class="text-lg font-semibold" for="name">Name*</label>
					<input
						class="px-3 py-2 rounded border"
						class:bg-red-100={form?.data?.includes('name')}
						class:border-red-500={form?.data?.includes('name')}
						type="text"
						name="name"
					/>
					{#if form?.data?.includes('name')}
						<div class="font-semibold text-red-600">Füllen Sie dieses Feld aus</div>
					{/if}
				</div>
			</div>
			<div class="flex flex-col space-y-2">
				<label class="text-lg font-semibold" for="email">E-Mail-Adresse*</label>
				<input
					class="px-3 py-2 rounded border"
					class:bg-red-100={form?.data?.includes('email')}
					class:border-red-500={form?.data?.includes('email')}
					type="email"
					name="email"
				/>
				{#if form?.data?.includes('email')}
					<div class="font-semibold text-red-600">Füllen Sie dieses Feld aus</div>
				{/if}
			</div>
			<div class="flex flex-col space-y-2">
				<label class="text-lg font-semibold" for="message">Nachricht*</label>
				<textarea
					class="px-3 py-2 rounded border"
					class:bg-red-100={form?.data?.includes('message')}
					class:border-red-500={form?.data?.includes('message')}
					name="message"
					placeholder="Ihre Nachricht..."
				/>
				{#if form?.data?.includes('message')}
					<div class="font-semibold text-red-600">Füllen Sie dieses Feld aus</div>
				{/if}
			</div>
			<button
				type="submit"
				class="px-5 py-3 bg-accent text-white rounded font-medium md:w-1/4 w-full text-lg"
				>Absenden</button
			>
		</form>
		<SuccessPopup bind:showModal>
			<h2 slot="header" class="text-3xl font-semibold">Kontaktformular abgesendet</h2>
			<div class="text-lg">
				Wenn diese Nachricht auftaucht, wurde ihr Kontaktformular erfolgreich abgesendet. Sie
				erhalten schnellstmöglich eine Antwort.
			</div>
		</SuccessPopup>
		<div class="pt-12 flex flex-col">
			<h1 class="uppercase text-2xl font-semibold mb-6">Oder per</h1>
			<div class="grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 gap-6">
				<div class="flex w-full bg-accent rounded p-6 md:m-6 text-white space-x-6">
					<div class="px-3 flex justify-center items-center">
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<mask
								id="mask0_926_803"
								style="mask-type:luminance"
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="24"
								height="24"
							>
								<path d="M24 0H0V24H24V0Z" fill="white" />
							</mask>
							<g mask="url(#mask0_926_803)">
								<path
									d="M21 1.00024H3C2.20435 1.00024 1.44129 1.31631 0.87868 1.87892C0.31607 2.44153 0 3.20459 0 4.00024V23.0002H24V4.00024C24 3.20459 23.6839 2.44153 23.1213 1.87892C22.5587 1.31631 21.7956 1.00024 21 1.00024ZM3 3.00024H21C21.2652 3.00024 21.5196 3.1056 21.7071 3.29314C21.8946 3.48067 22 3.73503 22 4.00024V4.66724L14.122 12.5462C13.5584 13.1076 12.7954 13.4227 12 13.4227C11.2046 13.4227 10.4416 13.1076 9.878 12.5462L2 4.66724V4.00024C2 3.73503 2.10536 3.48067 2.29289 3.29314C2.48043 3.1056 2.73478 3.00024 3 3.00024ZM2 21.0002V7.50024L8.464 13.9602C9.40263 14.8965 10.6743 15.4223 12 15.4223C13.3257 15.4223 14.5974 14.8965 15.536 13.9602L22 7.50024V21.0002H2Z"
									fill="white"
								/>
							</g>
						</svg>
					</div>
					<div class="flex flex-col space-y-1">
						<h1 class="text-xl font-medium">Mail</h1>
						<a href="mailto:office@sv-koweg.de" class="text-xl font-semibold">office@sv-koweg.de</a>
					</div>
				</div>
				<!-- test -->
				<div class="flex w-full bg-accent rounded p-6 md:m-6 text-white space-x-6">
					<div class="px-3 flex justify-center items-center">
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<mask
								id="mask0_926_803"
								style="mask-type:luminance"
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="24"
								height="24"
							>
								<path d="M24 0H0V24H24V0Z" fill="white" />
							</mask>
							<g mask="url(#mask0_926_803)">
								<path
									d="M21 1.00024H3C2.20435 1.00024 1.44129 1.31631 0.87868 1.87892C0.31607 2.44153 0 3.20459 0 4.00024V23.0002H24V4.00024C24 3.20459 23.6839 2.44153 23.1213 1.87892C22.5587 1.31631 21.7956 1.00024 21 1.00024ZM3 3.00024H21C21.2652 3.00024 21.5196 3.1056 21.7071 3.29314C21.8946 3.48067 22 3.73503 22 4.00024V4.66724L14.122 12.5462C13.5584 13.1076 12.7954 13.4227 12 13.4227C11.2046 13.4227 10.4416 13.1076 9.878 12.5462L2 4.66724V4.00024C2 3.73503 2.10536 3.48067 2.29289 3.29314C2.48043 3.1056 2.73478 3.00024 3 3.00024ZM2 21.0002V7.50024L8.464 13.9602C9.40263 14.8965 10.6743 15.4223 12 15.4223C13.3257 15.4223 14.5974 14.8965 15.536 13.9602L22 7.50024V21.0002H2Z"
									fill="white"
								/>
							</g>
						</svg>
					</div>
					<div class="flex flex-col space-y-1">
						<h1 class="text-xl font-medium">Telefon</h1>
						<a href="tel:+493581412077" class="text-xl font-semibold">+49 3581 41 20 77</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
