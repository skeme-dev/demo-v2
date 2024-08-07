<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SiteMap from '$lib/components/SiteMap.svelte';
	import BaseLayout from '$lib/layouts/BaseLayout.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<BaseLayout>
	<slot />
</BaseLayout>
