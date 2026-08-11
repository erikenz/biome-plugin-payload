import type { Payload } from "payload";

export async function findVersionsWithoutSelect(payload: Payload) {
	const versions = await payload.findVersions({
		collection: "posts",
		depth: 0,
		overrideAccess: true,
	});

	const version = await payload.findVersionByID({
		collection: "posts",
		id: "abc",
		depth: 0,
		overrideAccess: true,
	});

	return { versions, version };
}
