import type { Payload, PayloadRequest } from "payload";

// overrideAccess: false with user — should not be flagged
export async function findOverrideFalseWithUser(
  payload: Payload,
  req: PayloadRequest
) {
  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: false,
    select: {},
    user: req.user,
  });

  const doc = await payload.findByID({
    collection: "posts",
    depth: 0,
    id: "abc",
    overrideAccess: false,
    select: {},
    user: req.user,
  });

  return { doc, docs };
}
