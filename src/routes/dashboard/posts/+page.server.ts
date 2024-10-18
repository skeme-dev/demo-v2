import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const records = await locals.pb.collection('posts').getFullList({ expand: 'author' });

	// get posts created by current user
	const filteredRecords = records.filter((item) => {
		if (item.expand.author) {
			return item.expand.author.id == locals.pb.authStore.baseModel.id;
		}
	});

	return {
		posts: records,
		filteredPosts: filteredRecords
	};
};

export const actions = {
	createPost: async ({ request, locals }) => {
		const req = await request.formData();
		const title = req.get('title');

		if (!title) {
			fail(400, { title, missing: true });
		}

		let record;

		try {
			record = await locals.pb.collection('posts').create({
				title: title,
				content: JSON.stringify({ placeholder: true }),
				author: locals.pb.authStore.model.id
			});
		} catch (error) {
			console.log('on');
			return console.error(error);
		}

		redirect(303, '/dashboard/posts/edit/' + record.id);
	},

	updatePostMeta: async ({ request, locals }) => {
		const req = await request.formData();
	},

	updateContent: async ({ request, locals }) => {
		const req = await request.formData();
		const content = req.get('content');
		const postId = req.get('postId') as string;

		if (!content) {
			fail(400, { content, missing: true });
		}

		if (!postId) {
			fail(400, { postId, missing: true });
		}

		try {
			await locals.pb.collection('posts').update(postId, { content: content });
			return { success: true };
		} catch (error) {
			return fail(400, { error: error });
		}
	}
};
