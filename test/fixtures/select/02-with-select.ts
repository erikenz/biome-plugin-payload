import type { Payload, PayloadRequest } from "payload";

export async function findWithSelect(payload: Payload, req: PayloadRequest) {
	const doc = await req.payload.findByID({
		collection: "posts",
		depth: 0,
		id: "1",
		overrideAccess: true,
		req,
		select: {},
	});

	const docs = await payload.find({
		collection: "posts",
		depth: 0,
		overrideAccess: true,
		select: {},
	});

	return { doc, docs };
}
