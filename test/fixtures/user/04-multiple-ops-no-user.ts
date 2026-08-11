import type { Payload } from "payload";

// Multiple operations with overrideAccess: false and no user — each should be flagged
export async function multipleOpsNoUser(payload: Payload) {
	const post = await payload.create({
		collection: "posts",
		data: {},
		overrideAccess: false,
	});

	const docs = await payload.find({
		collection: "posts",
		depth: 0,
		overrideAccess: false,
		select: {},
	});

	return { post, docs };
}
