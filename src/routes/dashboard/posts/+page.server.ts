export const load = async ({ locals }) => {
	const records = await locals.pb.collection('posts').getFullList({ expand: 'author' });

	// get posts created by current user
	const filteredRecords = records.filter((item) => {
		return item.expand.author.id == locals.id;
	});

	console.log('aquired data: ', records);
	return {
		posts: records,
		filteredPosts: filteredRecords
	};
};
