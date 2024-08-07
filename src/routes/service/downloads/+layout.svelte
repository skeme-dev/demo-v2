<script lang="ts">
	import type { LayoutData } from './$types';
	import BaseLayout from '$lib/layouts/BaseLayout.svelte';

	export let data: LayoutData;
</script>

<BaseLayout>
	<slot />
</BaseLayout>
