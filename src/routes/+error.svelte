<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex space-y-6 flex-col justify-center items-center h-screen">
	<h1 class="text-center text-5xl font-bold">
		HTTP Fehler {$page.error.message == 'Not Found' ? 404 : 500}
	</h1>
	<h2 class="text-center text-2xl font-medium text-black">
		{$page.error.message == 'Not Found'
			? 'Die angeforderte Seite konnte nicht gefunden werden.'
			: 'Ein interner Fehler ist aufgetreten.'}
	</h2>
	<a class="px-5 py-3 bg-accent text-white rounded font-medium" href="/">Zurück zur Homepage</a>
</div>
