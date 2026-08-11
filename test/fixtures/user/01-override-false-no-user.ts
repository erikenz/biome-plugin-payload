import type { Payload, PayloadRequest } from "payload";

// overrideAccess: false without user — should be flagged
export async function findOverrideFalseNoUser(
  payload: Payload,
  req: PayloadRequest
) {
  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: false,
    select: {},
  });

  return docs;
}
