import type { Payload, PayloadRequest } from "payload";

export async function directDb(payload: Payload, req: PayloadRequest) {
  const doc = await payload.db.find({ collection: "posts" });

  const total = await req.payload.count({
    collection: "posts",
    overrideAccess: true,
  });

  return { doc, total };
}
