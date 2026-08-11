import type { Payload, PayloadRequest } from "payload";

export async function findGlobalWithoutOverrideAccess(
  payload: Payload,
  req: PayloadRequest
) {
  const footer = await payload.findGlobal({
    depth: 0,
    select: {},
    slug: "footer",
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { footer, total };
}
