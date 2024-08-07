<script lang="ts">
	export let icon;
	export let title;
	export let action: () => void;
	export let isActive: null | boolean = null;
	export let disable = false;
</script>

<button
	class={`w-9 py-1 rounded-lg ${isActive ? 'bg-gray-100' : ''}`}
	{title}
	on:click={action}
	disabled={disable}
>
	<i class={`ri-${icon} text-xl`} />
</button>
