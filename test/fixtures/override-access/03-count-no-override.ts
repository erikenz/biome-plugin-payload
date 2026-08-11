import type { Payload, PayloadRequest } from "payload";

export async function countWithoutOverrideAccess(
	payload: Payload,
	req: PayloadRequest,
) {
	const total = await payload.count({
		collection: "posts",
	});

	const doc = await req.payload.findByID({
		collection: "posts",
		depth: 0,
		id: "1",
		overrideAccess: true,
		req,
		select: {},
	});

	return { doc, total };
}
