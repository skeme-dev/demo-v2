<script lang="ts">
	import Badge from '../ui/badge/badge.svelte';
	import { roles } from '../roles';
	import { page } from '$app/stores';
	import * as Breadcrumb from '../ui/breadcrumb/index';
	import { House } from 'lucide-svelte';

	// get relevant parts of pathname (everything after /dashboard)
	let pathnameArray = $page.url.pathname.split('/');

	pathnameArray = pathnameArray.slice(-1 * (pathnameArray.length - 2), pathnameArray.length);

	function getBreadcrumbArray(arr: string[]) {
		let breadcrumbArray: string[] = [];
		switch (arr[0]) {
			case 'users':
				breadcrumbArray.push('Benutzer');
				break;

			case 'posts':
				breadcrumbArray.push('Berichte');
				break;

			case 'teams':
				breadcrumbArray.push('Teams');
				break;
			case 'departments':
				breadcrumbArray.push('Abteilungen');
				break;

			default:
				break;
		}

		if (arr.length > 1) {
			if (breadcrumbArray.includes('Abteilung')) {
				breadcrumbArray.push($page.data.department.label);
			}
			if (breadcrumbArray.includes('Teams')) {
				breadcrumbArray.push($page.data.team.title);
			}
		}

		return breadcrumbArray;
	}

	const breadcrumbArray = getBreadcrumbArray(pathnameArray);
</script>

<header class="flex justify-between w-full py-6 pr-6">
	<div class="flex items-center space-x-2">
		<!-- <p class="text-sm">Deine Rolle:</p>
		<Badge variant="secondary">
			{roles.get(user?.role)}
		</Badge> -->
		{#if $page.url.pathname != '/dashboard'}
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/dashboard">
							<House size={16} />
						</Breadcrumb.Link>
					</Breadcrumb.Item>

					{#if breadcrumbArray}
						{#each breadcrumbArray as part, index}
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Link asChild let:attrs>
									<a href="/components" {...attrs}>{part}</a>
								</Breadcrumb.Link>
							</Breadcrumb.Item>
							<!-- <Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
						</Breadcrumb.Item> -->
						{/each}
					{/if}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		{/if}
	</div>
	<div class="flex space-x-3">
		<button class="border bg-white flex justify-center items-center rounded-full w-10 h-10">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
				/>
			</svg>
		</button>
		<form method="post" action="/dashboard/login?/logout">
			<button
				type="submit"
				class="border bg-white flex justify-center items-center rounded-full w-10 h-10"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					stroke-width="1.5"
					class="w-5 h-5"
					><path
						d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"
					/></svg
				>
			</button>
		</form>
		<div class="flex justify-center items-center rounded-full w-10 h-10 bg-red-300">LS</div>
	</div>
</header>
