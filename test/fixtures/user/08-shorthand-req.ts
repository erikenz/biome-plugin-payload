import type { Payload, PayloadRequest } from "payload";

// req passed as shorthand property — should not be flagged
export async function findOverrideFalseWithReqShorthand(
  payload: Payload,
  req: PayloadRequest
) {
  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: false,
    req,
    select: {},
  });

  const updated = await payload.update({
    collection: "posts",
    id: "abc",
    data: { title: "Updated" },
    overrideAccess: false,
    req,
  });

  return { docs, updated };
}
