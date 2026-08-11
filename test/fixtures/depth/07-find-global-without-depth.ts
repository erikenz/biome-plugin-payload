import type { PayloadRequest } from "payload";

export async function findGlobalWithoutDepth(req: PayloadRequest) {
	const footer = await req.payload.findGlobal({
		overrideAccess: true,
		select: {},
		slug: "footer",
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
		req,
	});

	return { footer, total };
}
