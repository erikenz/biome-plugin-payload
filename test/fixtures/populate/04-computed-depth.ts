import type { Payload, PayloadRequest } from "payload";

export async function computedDepth(
  payload: Payload,
  req: PayloadRequest,
  depth: number,
  options?: { depth?: number }
) {
  // Shorthand property — cannot be verified.
  const docs = await payload.find({
    collection: "posts",
    depth,
    overrideAccess: true,
    select: {},
  });

  // Computed expression — cannot be verified.
  const byID = await req.payload.findByID({
    collection: "posts",
    depth: options?.depth ?? 0,
    id: "abc",
    overrideAccess: true,
    select: {},
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { byID, docs, total };
}
