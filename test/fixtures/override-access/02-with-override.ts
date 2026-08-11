import type { Payload, PayloadRequest } from "payload";

export async function findWithOverrideAccess(
	payload: Payload,
	req: PayloadRequest,
) {
	const doc = await req.payload.findByID({
		collection: "posts",
		depth: 0,
		id: "1",
		overrideAccess: false,
		req,
		select: {},
		user: req.user,
	});

	const docs = await payload.find({
		collection: "posts",
		depth: 0,
		overrideAccess: true,
		select: {},
	});

	const total = await payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { doc, docs, total };
}
