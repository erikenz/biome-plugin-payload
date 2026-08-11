import type { Payload, PayloadRequest } from "payload";

export async function shorthandDepth(
  payload: Payload,
  req: PayloadRequest,
  depth: number
) {
  const docs = await payload.find({
    collection: "posts",
    depth,
    overrideAccess: true,
    select: {},
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { docs, total };
}
