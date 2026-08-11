import type { Payload, PayloadRequest } from "payload";

export async function variableArgs(payload: Payload, req: PayloadRequest) {
	const options: Parameters<typeof payload.find>[0] = {
		collection: "posts",
		depth: 0,
		overrideAccess: true,
		select: {},
	};

	const docs = await payload.find(options);

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { docs, total };
}
