import type { Payload, PayloadRequest } from "payload";

export async function updateGlobalWithoutOverrideAccess(
  payload: Payload,
  req: PayloadRequest
) {
  const footer = await payload.updateGlobal({
    data: {},
    slug: "footer",
  });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { footer, total };
}
