import type { Payload, PayloadRequest } from "payload";

// spread args — should be skipped (keys cannot be verified statically)
export async function findOverrideFalseSpread(
  payload: Payload,
  req: PayloadRequest,
  base: Record<string, unknown>
) {
  const docs = await payload.find({
    collection: "posts",
    overrideAccess: false,
    ...base,
  });

  return docs;
}
