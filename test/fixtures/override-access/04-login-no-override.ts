import type { Payload, PayloadRequest } from "payload";

export async function loginWithoutOverrideAccess(
	payload: Payload,
	req: PayloadRequest,
) {
	const result = await payload.login({
		collection: "users",
		data: {
			email: "member@example.com",
			password: "password123",
		},
	});

	const total = await req.payload.count({
		collection: "posts",
		overrideAccess: true,
	});

	return { result, total };
}
