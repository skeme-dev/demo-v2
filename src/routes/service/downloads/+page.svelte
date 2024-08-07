<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const downloadableFiles = [
		{
			downloadLink: 'https://sv-koweg.de/service/downloads/o2ifoi23ogfbvb2giob',
			filename: 'Beispiel-Datei'
		},
		{
			downloadLink: 'https://sv-koweg.de/service/downloads/o2ifoi23ogfbvb2gi213f32fob',
			filename: 'Beispiel-Datei 2'
		},
		{
			downloadLink: 'https://sv-koweg.de/service/downloads/o2ifoi23ogfbvb2gi23rfob',
			filename: 'Beispiel-Datei 3'
		}
	];
</script>

<div class="flex flex-col space-y-6">
	<h1 class="text-4xl font-bold">Downloads</h1>
	<p class="text-lg">
		Hier finden Sie sind alle wichtigen Formulare und Informationen rund um unseren Verein als
		Download aufgeführt. Sollten Sie eine Frage haben, können Sie sich auch gerne an unsere
		Mitarbeiter in der Geschäftsstelle wenden.
	</p>
	<div class="flex flex-col space-y-6 md:w-1/2 w-full !mt-12">
		{#each downloadableFiles as file}
			<div class="flex items-center bg-accent text-white p-6">
				<div class="flex">
					<div class="mr-6 flex justify-center items-center">
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_929_795)">
								<mask
									id="mask0_929_795"
									style="mask-type:luminance"
									maskUnits="userSpaceOnUse"
									x="0"
									y="0"
									width="24"
									height="24"
								>
									<path d="M24 0H0V24H24V0Z" fill="white" />
								</mask>
								<g mask="url(#mask0_929_795)">
									<path
										d="M7 12H17V14H7V12ZM7 18H14V16H7V18ZM22 7.586V24H2V3C2 2.20435 2.31607 1.44129 2.87868 0.87868C3.44129 0.31607 4.20435 0 5 0H14.414L22 7.586ZM15 7H18.586L15 3.414V7ZM20 22V9H13V2H5C4.73479 2 4.48043 2.10536 4.2929 2.29289C4.10536 2.48043 4 2.73478 4 3V22H20Z"
										fill="white"
									/>
								</g>
							</g>
							<defs>
								<clipPath id="clip0_929_795">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</div>
					<h1 class="text-xl font-semibold">{file.filename}</h1>
				</div>
				<div class="p-1 flex justify-center items-center ml-auto">
					<a class="" href={file.downloadLink}>
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_930_801)">
								<mask
									id="mask0_930_801"
									style="mask-type:luminance"
									maskUnits="userSpaceOnUse"
									x="0"
									y="0"
									width="24"
									height="24"
								>
									<path d="M24 0H0V24H24V0Z" fill="white" />
								</mask>
								<g mask="url(#mask0_930_801)">
									<path
										d="M12.0322 19C12.4263 19.0007 12.8166 18.9234 13.1808 18.7728C13.545 18.6221 13.8758 18.4009 14.1542 18.122L18.0732 14.2L16.6592 12.79L13.0262 16.424L13.0002 0H11.0002L11.0262 16.408L7.40619 12.788L5.99219 14.2L9.91119 18.119C10.1893 18.3983 10.5198 18.6199 10.8838 18.7711C11.2478 18.9223 11.638 19.0001 12.0322 19Z"
										fill="white"
									/>
									<path
										d="M22 16.0005V21.0005C22 21.2657 21.8946 21.52 21.7071 21.7076C21.5196 21.8951 21.2652 22.0005 21 22.0005H3C2.73478 22.0005 2.48043 21.8951 2.29289 21.7076C2.10536 21.52 2 21.2657 2 21.0005V16.0005H0V21.0005C0 21.7961 0.31607 22.5592 0.87868 23.1218C1.44129 23.6844 2.20435 24.0005 3 24.0005H21C21.7956 24.0005 22.5587 23.6844 23.1213 23.1218C23.6839 22.5592 24 21.7961 24 21.0005V16.0005H22Z"
										fill="white"
									/>
								</g>
							</g>
							<defs>
								<clipPath id="clip0_930_801">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
