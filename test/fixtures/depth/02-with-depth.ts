import type { Payload, PayloadRequest } from "payload";

export async function findWithDepth(payload: Payload, req: PayloadRequest) {
  const doc = await req.payload.findByID({
    collection: "posts",
    depth: 1,
    id: "1",
    overrideAccess: true,
    populate: {},
    req,
    select: {},
  });

  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: true,
    select: {},
  });

  return { doc, docs };
}
