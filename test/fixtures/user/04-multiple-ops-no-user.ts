import type { Payload, PayloadRequest } from "payload";

// Multiple operations with overrideAccess: false and no user — each should be flagged
export async function multipleOpsNoUser(
  payload: Payload,
  req: PayloadRequest
) {
  const post = await payload.create({
    collection: "posts",
    data: { title: "New post" },
    overrideAccess: false,
  });

  const updated = await payload.update({
    collection: "posts",
    id: "abc",
    data: { title: "Updated" },
    overrideAccess: false,
  });

  return { post, updated };
}
