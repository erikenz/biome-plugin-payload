import type { Payload, PayloadRequest } from "payload";

export async function depthWithPopulate(payload: Payload, req: PayloadRequest) {
	const doc = await req.payload.findByID({
		collection: "posts",
		depth: 1,
		id: "1",
		overrideAccess: true,
		populate: {},
		req,
		select: {},
	});

	const total = await payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { doc, total };
}
