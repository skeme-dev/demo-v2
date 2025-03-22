<script lang="ts">
	import BaseLayout from '$lib/layouts/BaseLayout.svelte';
</script>

<BaseLayout isSitemapActive={false} isEventsActive={false} isBreadcrumbActive={false}>
	<slot />
</BaseLayout>
