import type { Payload, PayloadRequest } from "payload";

// req carries req.user — Payload reads it automatically, no explicit user needed
export async function findOverrideFalseWithReq(
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

  return docs;
}
