import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const postId = params.postId as string;

	let post, errorMsg;

	try {
		post = await locals.pb.collection('posts').getOne(postId);
	} catch (error) {
		console.error(error.status);
		if (error.status == 404) {
			redirect(303, '/dashboard/posts');
		}
	}

	console.log(post.content);

	return { post };
};
export const actions: Actions = {
	default: async () => {},
	createPost: async () => {}
};
