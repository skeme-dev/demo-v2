<script lang="ts">
	export let icon;
	export let title;
	export let action: () => void;
	export let isActive: null | boolean = null;
	export let disable = false;
</script>

<button
	class={`cursor-pointer flex justify-center items-center w-9 py-1 px-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-black text-white hover:bg-black' : ''}`}
	{title}
	on:click={action}
	disabled={disable}
>
	<i class={`ri-${icon} text-xl`} />
</button>
