import type { Payload, PayloadRequest } from "payload";

export async function deleteWithoutOverrideAccess(
  payload: Payload,
  req: PayloadRequest
) {
  const post = await req.payload.deleteByID({
    collection: "posts",
    id: "1",
    req,
  });

  const total = await payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { post, total };
}
