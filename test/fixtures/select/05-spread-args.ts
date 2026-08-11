import type { Payload, PayloadRequest } from "payload";

export async function spreadArgs(payload: Payload, req: PayloadRequest) {
	const base = { depth: 0, overrideAccess: true };

	const docs = await payload.find({
		...base,
		collection: "posts",
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { docs, total };
}
