<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	const routes = [
		{
			label: 'Unser Verein',
			route: '/',
			subroutes: [
				{
					label: 'Aktuelles',
					route: '/'
				},

				{
					label: 'Geschäftsstelle',
					route: '/verein/geschaeftsstelle'
				},
				{
					label: 'Vorstand',
					route: '/verein/vorstand'
				},
				{
					label: 'Vereinsstruktur',
					route: '/verein/struktur'
				},
				{
					label: 'Sportstätten',
					route: '/verein/sportstaetten'
				},
				{
					label: 'Vereinshistorie',
					route: '/verein/historie'
				},
				{
					label: 'Satzung',
					route: '/verein/satzung'
				}
			]
		},
		{
			label: 'Sportangebot',
			route: '/sportangebote',
			subroutes: [
				{
					label: 'Volleyball',
					route: '/sportangebote/volleyball'
				}
			]
		},
		{
			label: 'Sponsoren',
			route: '/sponsoren'
		},
		{
			label: 'Shop',
			route: '/shop'
		},
		{
			label: 'Sportlerklause',
			route: '/sportlerklause'
		},
		{
			label: 'Service',
			route: '/service',
			subroutes: [
				{
					label: 'Downloads',
					route: '/service/downloads'
				}
			]
		},
		{
			label: 'Kontakt',
			route: '/kontakt'
		}
	];

	let isHamburgerMenuOpen = false;
	let activeDropdown = {
		index: 0,
		isActive: false
	};
	let navbarElementHeight;

	function toggleHamburgerMenu() {
		isHamburgerMenuOpen = !isHamburgerMenuOpen;
	}

	function maybe(node, options) {
		if (isHamburgerMenuOpen) {
			return options.fn(node, options);
		}
	}

	let shrinked = false;

	function shrinkNavbar() {
		if (
			document.body.scrollTop > navbarElementHeight ||
			document.documentElement.scrollTop > navbarElementHeight
		) {
			shrinked = true;
		} else {
			shrinked = false;
		}
	}
</script>

<nav bind:clientHeight={navbarElementHeight} class="sticky top-0 left-0 z-20">
	<header
		class="transition-all duration-300 md:w-full h-fit bg-white z-50 sticky flex md:px-64 px-8 {shrinked
			? 'py-2'
			: 'py-6'}"
	>
		<a
			href="/"
			class="transition-all duration-300 {shrinked ? 'md:w-20 w-14' : 'md:w-24 w-16'} h-fit"
		>
			<img src="/sv-koweg-logo.png" alt="SV Koweg Logo" />
		</a>

		<ul class="md:flex hidden md:flex-row flex-col items-center space-x-6 ml-auto">
			{#each routes as route, index}
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->

				<li
					class:relative={route.subroutes}
					class:z-10={!route.subroutes}
					on:mouseover={(e) => {
						if (route.subroutes) {
							activeDropdown.index = index;
							activeDropdown.isActive = true;
						}
					}}
					on:mouseleave={(e) => {
						if (route.subroutes) {
							if (document.elementFromPoint(e.clientX, e.clientY)?.id == 'dropdown') {
								return;
							}
							activeDropdown.index = 0;
							activeDropdown.isActive = false;
						}
					}}
				>
					<a
						class="group transition duration-300 font-semibold text-xl uppercase"
						href={route.route}
					>
						{route.label}
						<span
							class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"
						/>
					</a>
					{#if route.subroutes}
						{#if activeDropdown.index == index && activeDropdown.isActive}
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								on:mouseleave={(e) => {
									if (route.subroutes) {
										activeDropdown.index = 0;
										activeDropdown.isActive = false;
									}
								}}
								id="dropdown"
								class="pt-10 w-[10vw] absolute top-0 left-0"
							>
								<div
									transition:fade={{ duration: 100 }}
									class="mr-12 divide-y bg-white shadow-lg border-t-[3px] border-accent py-3 pl-3 pr-5 w-full"
								>
									{#each route.subroutes as subroute}
										<a
											class="py-2 pl-2 font-medium transition-[200ms] hover:text-accent block w-full h-full text-lg"
											href={subroute.route}
										>
											<span>{subroute.label}</span>
										</a>
									{/each}
								</div>
							</div>
						{/if}
					{/if}
				</li>
			{/each}
		</ul>
		<div class="md:hidden flex justify-center items-center ml-auto">
			<button on:click={toggleHamburgerMenu} class="p-2">
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
					><path
						stroke="rgba(0, 0, 0, 0.5)"
						stroke-linecap="round"
						stroke-miterlimit="10"
						stroke-width="2"
						d="M4 7h22M4 15h22M4 23h22"
					/></svg
				>
			</button>
		</div>
	</header>
	{#if isHamburgerMenuOpen}
		<div transition:slide class="bg-white px-8 pb-4 md:hidden flex flex-1 w-full">
			<ul class="flex flex-col ml-auto items-end space-y-1">
				{#each routes as route, index}
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->

					<li class="flex flex-col">
						{#if route.subroutes}
							<button
								on:click={(e) => {
									if (!(activeDropdown.index == index && activeDropdown.isActive)) {
										activeDropdown.index = index;
										activeDropdown.isActive = true;
									} else {
										activeDropdown.index = 0;
										activeDropdown.isActive = false;
									}
								}}
								class="text-right font-semibold text-lg uppercase">{route.label}</button
							>
						{:else}
							<a
								class="group transition duration-300 font-semibold text-lg uppercase"
								href={route.route}
							>
								{route.label}
							</a>
						{/if}
						{#if activeDropdown.index == index && activeDropdown.isActive}
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<ul class="flex justify-end items-end py-2" transition:slide>
								<li class="bg-white w-full">
									{#each route.subroutes as subroute}
										<a class="text-right block w-full h-full text-lg" href={subroute.route}>
											<span>{subroute.label}</span>
										</a>
									{/each}
								</li>
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>

<svelte:window on:scroll={shrinkNavbar} />
