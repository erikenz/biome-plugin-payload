import type { PayloadRequest } from "payload";

export async function findByIDWithoutDepth(req: PayloadRequest) {
  const doc = await req.payload.findByID({
    collection: "posts",
    id: "1",
    overrideAccess: true,
    req,
    select: {},
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
    req,
  });

  return { doc, total };
}
