import type { Payload, PayloadRequest } from "payload";

export async function depthWithoutPopulate(
	payload: Payload,
	req: PayloadRequest,
) {
	const docs = await payload.find({
		collection: "posts",
		depth: 1,
		overrideAccess: true,
		select: {},
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { docs, total };
}
