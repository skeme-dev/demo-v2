<script lang="ts">
	import BaseLayout from '$lib/layouts/BaseLayout.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<slot />
