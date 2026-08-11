import type { Payload, PayloadRequest } from "payload";

export async function findWithoutSelect(payload: Payload, req: PayloadRequest) {
  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: true,
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { docs, total };
}
