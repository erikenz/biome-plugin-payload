import type { Payload, PayloadRequest } from "payload";

export async function findGlobalWithoutSelect(
	payload: Payload,
	req: PayloadRequest,
) {
	const footer = await payload.findGlobal({
		depth: 0,
		overrideAccess: true,
		slug: "footer",
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { footer, total };
}
