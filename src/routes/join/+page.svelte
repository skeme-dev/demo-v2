<script lang="ts">
	export let data;

	const departments = [
		{
			id: 1,
			label: 'Volleyball'
		},
		{
			id: 2, 
			label: 'Fußball'
		}
	];

	function send() {
		const form = new FormData();
	}
</script>

<div class="gap-6 flex flex-col w-3/4">
	<h1 class="text-4xl font-bold">Werde ein Teil von uns.</h1>
	<div class="flex flex-col">
		<p class="md:text-left text-justify text-lg">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet vero blanditiis vel quidem ipsa
			<!-- magnam esse rerum, tempore molestiae repellat, accusamus ipsam magni nulla atque nobis quam. -->
			Ad, molestiae voluptates.
		</p>
	</div>
	<div class="flex flex-col gap-4 p-6 w-full bg-[#eee]">
		<h1 class="text-2xl font-semibold">Persönliche Daten</h1>
		<hr class="border border-gray-200" />
		<div class="flex flex-col gap-3">
			<label for="name" class=" font-semibold">Name</label>
			<input type="text" id="name" name="name" class="p-2 border border-gray-300 rounded-md" />
		</div>
		<div class="flex flex-col gap-3">
			<label for="name" class=" font-semibold">E-Mail</label>
			<input type="email" id="email" name="email" class="p-2 border border-gray-300 rounded-md" />
		</div>
		<div class="flex flex-col gap-3">
			<label for="gender" class=" font-semibold">Geschlecht</label>
			<select
				name="gender"
				id="gender"
				class="p-2 border border-gray-300 rounded-md"
				placeholder="Bitte wählen Sie ein Geschlecht"
			>
				<option value="female">Weiblich</option>
				<option value="male">Männlich</option>
				<option value="diverse">Divers</option>
			</select>
		</div>
		<div class="flex flex-col gap-3">
			<label for="bday" class="font-semibold">Geburtsdatum</label>
			<input type="date" id="bday" name="bday" class="p-2 border border-gray-300 rounded-md" />
		</div>
	</div>
	<div class="flex flex-col gap-4 p-6 w-full bg-[#eee]">
		<h1 class="text-2xl font-semibold">Informationen für den Verein</h1>
		<hr class="border border-gray-200" />

		<div class="flex flex-col gap-3">
			<label for="department" class=" font-semibold">Abteilung</label>
			<select
				name="department"
				id="department"
				class="p-2 border border-gray-300 rounded-md"
				placeholder="Bitte wählen Sie eine Abteilung"
			>
				{#each departments as department}
					<option value={department.id}>{department.label}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-3">
			<label for="name" class=" font-semibold">E-Mail</label>
			<input type="email" id="email" name="email" class="p-2 border border-gray-300 rounded-md" />
		</div>
		<div class="flex flex-col gap-3">
			<label for="gender" class=" font-semibold">Geschlecht</label>
			<select
				name="gender"
				id="gender"
				class="p-2 border border-gray-300 rounded-md"
				placeholder="Bitte wählen Sie ein Geschlecht"
			>
				<option value="female">Weiblich</option>
				<option value="male">Männlich</option>
				<option value="diverse">Divers</option>
			</select>
		</div>
		<div class="flex flex-col gap-3">
			<label for="bday" class="font-semibold">Geburtsdatum</label>
			<input type="date" id="bday" name="bday" class="p-2 border border-gray-300 rounded-md" />
		</div>
	</div>
	<button class="px-5 py-3 ml-auto bg-accent text-white rounded font-medium md:w-1/4 w-full text-lg"
		>Absenden</button
	>
</div>
