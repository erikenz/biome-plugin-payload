import type { Payload, PayloadRequest } from "payload";

export async function otherOps(payload: Payload, req: PayloadRequest) {
  const total = await payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  const footer = await req.payload.findGlobal({
    depth: 0,
    overrideAccess: true,
    select: {},
    slug: "footer",
  });

  return { footer, total };
}
