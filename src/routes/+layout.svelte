<script>
	import { onMount } from 'svelte';

	import { screenWidthWriteable } from '$lib/stores/screenDimensionStore';
	import { page } from '$app/stores';

	onMount(async () => {
		screenWidthWriteable.set(document.documentElement.clientWidth);
		if ($page.url.pathname.includes('dashboard')) {
			await import('../dashboard.css');
			await import('remixicon/fonts/remixicon.css');
		} else {
			await import('../app.css');
		}
	});
</script>

<slot />
