<script>
	export let data;
</script>

<div class="rounded flex bg-accent p-6 text-white space-x-6">
	<div class="flex md:flex-1 flex-col justify-center">
		<span class="font-semibold text-xl mb-1">
			{data.name}
		</span>
		<span class="mb-3 text-lg">{data.position}</span>

		<div class="mr-auto flex flex-col space-y-px">
			<span class="flex items-center justify-center space-x-2">
				<svg
					class=""
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<mask
						id="mask0_926_803"
						style="mask-type:luminance"
						maskUnits="userSpaceOnUse"
						x="0"
						y="0"
						width="24"
						height="24"
					>
						<path d="M24 0H0V24H24V0Z" fill="white" />
					</mask>
					<g mask="url(#mask0_926_803)">
						<path
							d="M21 1.00024H3C2.20435 1.00024 1.44129 1.31631 0.87868 1.87892C0.31607 2.44153 0 3.20459 0 4.00024V23.0002H24V4.00024C24 3.20459 23.6839 2.44153 23.1213 1.87892C22.5587 1.31631 21.7956 1.00024 21 1.00024ZM3 3.00024H21C21.2652 3.00024 21.5196 3.1056 21.7071 3.29314C21.8946 3.48067 22 3.73503 22 4.00024V4.66724L14.122 12.5462C13.5584 13.1076 12.7954 13.4227 12 13.4227C11.2046 13.4227 10.4416 13.1076 9.878 12.5462L2 4.66724V4.00024C2 3.73503 2.10536 3.48067 2.29289 3.29314C2.48043 3.1056 2.73478 3.00024 3 3.00024ZM2 21.0002V7.50024L8.464 13.9602C9.40263 14.8965 10.6743 15.4223 12 15.4223C13.3257 15.4223 14.5974 14.8965 15.536 13.9602L22 7.50024V21.0002H2Z"
							fill="white"
						/>
					</g>
				</svg>
				<a href="mailto:{data.email}">{data.email}</a>
			</span>
			<span class="flex items-center space-x-2">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M14.2002 16.2611C11.2886 15.0283 8.97324 12.7076 7.74719 9.79307L11.1472 6.38707L4.88719 0.12207L1.71619 3.29207C1.16619 3.84521 0.731343 4.50193 0.436795 5.22422C0.142247 5.94652 -0.00614821 6.72005 0.000195101 7.50007C0.000195101 14.7481 9.25219 24.0001 16.5002 24.0001C17.2801 24.0069 18.0537 23.8587 18.7759 23.5642C19.4981 23.2696 20.1545 22.8345 20.7072 22.2841L23.8782 19.1131L17.6132 12.8481L14.2002 16.2611ZM19.2922 20.8701C18.925 21.2341 18.489 21.5215 18.0097 21.7155C17.5304 21.9095 17.0173 22.0062 16.5002 22.0001C10.2672 22.0001 2.00019 13.7331 2.00019 7.50007C1.9943 6.9829 2.09115 6.46971 2.28513 5.99026C2.47911 5.51081 2.76635 5.07465 3.13019 4.70707L4.88719 2.95007L8.32419 6.38707L5.38919 9.32207L5.63419 9.93607C6.35544 11.8654 7.48295 13.6172 8.94034 15.0726C10.3977 16.5281 12.151 17.6534 14.0812 18.3721L14.6872 18.6031L17.6132 15.6761L21.0502 19.1131L19.2922 20.8701Z"
						fill="white"
					/>
				</svg>
				<a href="tel:{data.phone}">{data.phone}</a>
			</span>
		</div>
	</div>
	<div class="md:block flex items-center w-1/3">
		<img class="rounded" src={data.imageUrl} alt={`Profilbild von ${data.name}`} />
	</div>
</div>
