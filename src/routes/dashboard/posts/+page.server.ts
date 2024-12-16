import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const records = await locals.pb.collection('posts').getFullList({ expand: 'author' });
	const departments = await locals.pb.collection('departments').getFullList({ fields: locals.pb.authStore.model.role == "DEPARTMENT_LEADER" ? "id,label,expand.leader.id" : "id,label", expand:"leader"});
	const teams = await locals.pb.collection('teams').getFullList({ fields: "id,title,expand.trainers.id", expand: "trainers" });


	// get posts created by current user

	const filteredRecords = records.filter((item) => {
		if (item.expand.author) {
			return item.expand.author.id == locals.pb.authStore.baseModel.id;
		}
	});

	let trainerTeam;
	let leaderDepartment;

	if (locals.pb.authStore.model.role == "TRAINER") {

		let t = [];

		teams.forEach((v) => {
			for (const trainer of v.expand.trainers) {
				if (trainer.id == locals.pb.authStore.baseModel.id) {
					t.push(v);
				}
			}
		});

		if (t.length > 0) {
			trainerTeam = t[0]
		} else {
			trainerTeam = null;
		}

	}

	if (locals.pb.authStore.model.role == "DEPARTMENT_LEADER") {
		departments.forEach((v) => {
			if (v.expand.leader.id == locals.pb.authStore.model.id) {
				leaderDepartment = v;
			}
		})
	}

	return {
		posts: records,
		filteredPosts: filteredRecords,
		departments: departments,
		teams: teams,
		trainerTeam: trainerTeam,
		leaderDepartment: leaderDepartment,
	};
};

export const actions = {
	createPost: async ({ request, locals }) => {
		const req = await request.formData();
		const title = req.get('title') as string;
		// const departments = req.getAll("departments") as string[];
		// const teams = req.getAll("teams") as string[];
		const role = req.get("role") as string;
		const teamId = req.get("teamId") as string;
		const leaderDepartmentId = req.get("leaderDepartmentId") as string;
		const correspondingTeams = req.get("teams") as string;

		console.log("corresponding teams", correspondingTeams);

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

			if (role == "TRAINER") {
				await locals.pb.collection('teams').update(teamId, {
					"relatedPosts+": [record.id],
				});
			}

			if (role == "DEPARTMENT_LEADER") {
				if (leaderDepartmentId != "") {
					await locals.pb.collection("departments").update(leaderDepartmentId, {
						"relatedPosts+": [record.id],
					})
				}
				if (correspondingTeams !== "undefined") {
					if (JSON.parse(correspondingTeams).length > 0) {
						for (const teamId of JSON.parse(correspondingTeams) as string[]) {
							await locals.pb.collection("teams").update(teamId, { "relatedPosts+": [record.id] });
						}
					}
				} else {
					console.error("ERROR")
				}
			}

		} catch (error) {
			console.log('on');
			return console.error(error);
		}

		// redirect(303, '/dashboard/posts/edit/' + record.id);
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
