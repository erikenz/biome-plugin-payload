import type { Payload, PayloadRequest } from "payload";

// overrideAccess: true without user — should NOT be flagged (bypass on, no user needed)
export async function findOverrideTrueNoUser(
  payload: Payload,
  req: PayloadRequest
) {
  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: true,
    select: {},
  });

  const total = await payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { docs, total };
}
