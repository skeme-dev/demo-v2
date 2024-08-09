export const load = async ({ locals }) => {
	const records = await locals.pb.collection('posts').getFullList({ expand: 'author' });

	// get posts created by current user
	const filteredRecords = records.filter((item) => {
		console.log(item);
		return item.expand.author.id == locals.pb.authStore.baseModel.id;
	});

	console.log('filtered records ', filteredRecords);
	return {
		posts: records,
		filteredPosts: filteredRecords
	};
};
