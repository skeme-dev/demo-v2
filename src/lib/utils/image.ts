export const getImageSizes = (imageUrl: string) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () =>
			resolve({ w: image.naturalWidth, h: image.naturalHeight })
		);
		image.addEventListener('error', (error) => reject(error));
		// needed to avoid cross-origin issues on CodeSandbox
		image.src = imageUrl;
	});
