<script lang="ts">
	import { page } from '$app/stores';

	const arr = $page.url?.pathname.split('/');

	// Remove first "/" from array
	arr.shift();

	function getStringForBreadcrumb(arr: string[]) {
		let outputArray: string[] = [];
		arr.forEach((arrElement) => {
			const capitalizedLetter = arrElement.charAt(0).toUpperCase();
			if (arrElement.includes('ss')) {
				arrElement.replace('ss', 'ß');
			}
			let arr2 = arrElement.split('');
			arr2.shift();
			arr2.unshift(capitalizedLetter);
			outputArray.push(arr2.join(''));
		});
		return outputArray;
	}

	let arr2 = getStringForBreadcrumb(arr);

	function getLinkForSubpage(index: number): string {
		let outputString: string = '/';
		for (let i = 0; i < index + 1; i++) {
			const element = arr[i];
			console.log(element);
			outputString += element + '/';
		}
		return outputString;
	}
</script>

<div class="md:block hidden text-lg mb-12">
	<span class="mr-6">Sie befinden Sich hier:</span>
	{#each arr2 as elem, index}
		<a href={getLinkForSubpage(index)}>
			{elem.replace('ss', 'ß')}
		</a>
		{#if index !== getStringForBreadcrumb(arr).length - 1}
			<span class="mx-1"> > </span>
		{/if}
	{/each}
</div>
