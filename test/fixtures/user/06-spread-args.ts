import type { Payload } from "payload";

// Calls with spread arguments — skipped by rule
export async function findOverrideFalseSpread(
	payload: Payload,
	base: Record<string, unknown>,
) {
	const docs = await payload.find({
		...base,
		collection: "posts",
		overrideAccess: false,
	});

	return docs;
}
