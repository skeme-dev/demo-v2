<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	export let form;
</script>

<div class="flex flex-col space-y-6">
	<div class="flex">
		<div class="md:w-4/5 w-full flex-col space-y-6 md:pr-36">
			<h1 class="text-4xl font-bold">Sportlerklause</h1>
			<div class="flex flex-col">
				<p class="md:text-left text-justify text-lg">
					Wir möchten Sie gern in unserer Vereinsklause begrüßen. Neben täglichen Öffnungszeiten
					bieten wir Ihnen die Möglichkeit, die Räumlichkeiten für private Veranstaltungen und
					(Vereins-)Versammlungen zu mieten. Dabei steht Ihnen unser qualifiziertes Fachpersonal
					gern zur Verfügung. Die monatlichen Tanzabende sind nur ein Event, was auf große
					Begeisterung stößt. Haben Sie Interesse oder möchten gern einfach einmal bei einem
					Spaziergang durch Rauschwalde / Biesnitz die Gelegenheit nutzen, bei uns einzukehren -
					trauen Sie sich ruhig. Wir freuen uns auf Ihren Besuch.
				</p>

				<div class="md:hidden block w-full relative">
					<div
						class="h-fit mt-6 space-y-6 flex flex-col rounded bg-accent text-white py-6 px-8 w-full"
					>
						<h1 class="text-xl font-medium">Verantwortliche</h1>
						<div class="md:w-full">
							<img
								src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=920"
								alt="Profilbild des Verantwortlichen der Sportlerklause"
								class="rounded"
							/>
						</div>
						<div class="flex flex-col space-y-1">
							<h2 class="text-2xl font-semibold">Hans Wurst</h2>
							<span class="text-lg"><a href="tel:+49123456789">+49 1234 56789</a></span>
							<span class="text-lg"><a href="mailto:klause@sv-koweg.de">klause@sv-koweg.de</a></span
							>
						</div>
					</div>
				</div>

				<div class="flex flex-col md:space-x-12 mt-12 p-6 bg-[#eee] md:w-fit w-full">
					<div class="flex items-center md:space-x-5 mb-4">
						<svg
							class="md:block hidden"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_945_1108)">
								<circle cx="12" cy="12" r="11" stroke="black" stroke-width="2" />
								<path
									d="M12.0112 7L12 12.6361"
									stroke="black"
									stroke-width="2"
									stroke-linecap="round"
								/>
								<path d="M15 16L12 13" stroke="black" stroke-width="2" stroke-linecap="round" />
								<rect x="11" y="9" width="1" height="4" fill="black" />
							</g>
							<defs>
								<clipPath id="clip0_945_1108">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<h1 class="text-xl font-semibold">Öffnungszeiten</h1>
					</div>
					<div class="flex flex-col">
						<div class="grid md:openings-grid openings-grid gap-x-6 gap-y-3">
							<span>Montag + Donnerstag</span>
							<span>17:00 - 20:30 Uhr</span>
							<span>Dienstag + Mittwoch + Freitag</span>
							<span>nach Vereinbarung</span>
							<span>Samstag + Sonntag</span>
							<span>bei Spielbetrieb oder nach Vereinbarung</span>
						</div>
					</div>
				</div>
			</div>
			<h1 class="uppercase text-2xl font-semibold !mt-12">Kontaktformular für die Klause</h1>

			<form class="space-y-6" method="POST" action="?/sendContactForm">
				<div class="flex md:flex-row flex-col w-full md:space-x-6 md:space-y-0 space-y-6">
					<div class="w-full flex flex-col space-y-2">
						<label class="text-lg font-semibold" for="salutation">Anrede*</label>
						<select class="px-3 py-2 rounded border" required name="salutation">
							<option value="female">Frau</option>
							<option value="male">Herr</option>
							<option value="diverse">Divers</option>
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
		</div>

		<div class="md:block hidden w-1/5 relative">
			<div class="h-fit mt-6 space-y-6 flex flex-col rounded bg-accent text-white py-6 px-8 w-full">
				<h1 class="text-xl font-medium">Verantwortliche</h1>
				<div class="w-full">
					<img
						src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=920"
						alt="Profilbild des Verantwortlichen der Sportlerklause"
						class="rounded"
					/>
				</div>
				<div class="flex flex-col space-y-1">
					<h2 class="text-2xl font-semibold">Hans Wurst</h2>
					<span class="text-lg"><a href="tel:+49123456789">+49 1234 56789</a></span>
					<span class="text-lg"><a href="mailto:klause@sv-koweg.de">klause@sv-koweg.de</a></span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.openings-grid {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 768px) {
		.openings-grid {
			grid-template-columns: auto 1fr;
		}
	}
</style>
