import type { PayloadRequest } from "payload";

export async function findGlobalWithoutPopulate(req: PayloadRequest) {
  const footer = await req.payload.findGlobal({
    depth: 1,
    overrideAccess: true,
    select: {},
    slug: "footer",
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
    req,
  });

  return { footer, total };
}
