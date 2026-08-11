import type { Payload } from "payload";

// overrideAccess: true without user — should NOT be flagged
export async function findOverrideTrueNoUser(payload: Payload) {
	const docs = await payload.find({
		collection: "posts",
		depth: 0,
		overrideAccess: true,
		select: {},
	});

	return docs;
}
