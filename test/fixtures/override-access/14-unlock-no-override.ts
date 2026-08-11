import type { Payload } from "payload";

// unlock is an auth operation that also supports overrideAccess.
export async function unlockWithoutOverrideAccess(payload: Payload) {
	const result = await payload.unlock({
		collection: "users",
		data: {
			email: "member@example.com",
		},
	});

	return result;
}
