import type { Payload, PayloadRequest } from "payload";

export async function findByIDWithEmptySelect(
  payload: Payload,
  req: PayloadRequest
) {
  const doc = await req.payload.findByID({
    collection: "posts",
    depth: 0,
    id: "1",
    overrideAccess: true,
    req,
    select: {},
  });

  const total = await payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { doc, total };
}
