import type { Payload, PayloadRequest } from "payload";

export async function findWithoutOverrideAccess(
	payload: Payload,
	req: PayloadRequest,
) {
	const docs = await payload.find({
		collection: "posts",
		depth: 0,
		select: {},
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { docs, total };
}
