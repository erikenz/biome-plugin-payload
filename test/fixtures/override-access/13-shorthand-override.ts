import type { Payload, PayloadRequest } from "payload";

export async function shorthandOverrideAccess(
	payload: Payload,
	req: PayloadRequest,
	overrideAccess: boolean,
) {
	const docs = await payload.find({
		collection: "posts",
		depth: 0,
		overrideAccess,
		select: {},
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { docs, total };
}
