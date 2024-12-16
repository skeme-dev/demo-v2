import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

// place files you want to import through the `$lib` alias in this folder.
export const dimensions = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536
};

export function getImageUrl(teamId: string, filename: string) {
	const url: string = `${PUBLIC_POCKETBASE_URL}/api/files/teams/${teamId}/${filename}?thumb=1000x600`;
	return url;
}
