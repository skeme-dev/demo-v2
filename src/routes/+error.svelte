<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex space-y-6 flex-col justify-center items-center h-screen">
	<h1 class="text-center text-5xl font-bold">HTTP Error {$page.error.code}</h1>
	<h2 class="text-center text-2xl font-medium text-black">
		{$page.error.code == 404
			? 'Die angeforderte Seite konnte nicht gefunden werden.'
			: 'Ein interner Fehler ist aufgetreten.'}
	</h2>
	<a class="px-5 py-3 bg-accent text-white rounded font-medium" href="/">Zurück zur Homepage</a>
</div>
