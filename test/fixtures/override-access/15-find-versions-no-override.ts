import type { Payload } from "payload";

export async function findVersionsWithoutOverrideAccess(payload: Payload) {
	const versions = await payload.findVersions({
		collection: "posts",
		depth: 0,
		select: { version: true },
	});

	const version = await payload.findVersionByID({
		collection: "posts",
		id: "abc",
		depth: 0,
		select: { version: true },
	});

	return { versions, version };
}
