import type { Payload, PayloadRequest } from "payload";

// user passed as shorthand property — should not be flagged
export async function findOverrideFalseUserShorthand(
  payload: Payload,
  req: PayloadRequest
) {
  const user = req.user;

  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: false,
    select: {},
    user,
  });

  return docs;
}
