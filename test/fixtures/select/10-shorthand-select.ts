import type { Payload, PayloadRequest } from "payload";

export async function shorthandSelect(
  payload: Payload,
  req: PayloadRequest,
  select: object
) {
  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: true,
    select,
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { docs, total };
}
