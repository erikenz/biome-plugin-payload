import type { Payload, PayloadRequest } from "payload";

export async function updateWithoutOverrideAccess(
	payload: Payload,
	req: PayloadRequest,
) {
	const post = await payload.updateByID({
		collection: "posts",
		data: {},
		id: "1",
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { post, total };
}
