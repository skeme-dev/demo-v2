<script lang="ts">
	import Head from '$lib/components/dashboard/components/editor/Head.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<slot />
