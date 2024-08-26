import type { Actions } from '@sveltejs/kit';

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
