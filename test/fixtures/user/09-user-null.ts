import type { Payload } from "payload";

// overrideAccess: false with user: null — explicit intentional anonymous query, accepted
export async function findOverrideFalseUserNull(payload: Payload) {
  const docs = await payload.find({
    collection: "posts",
    depth: 0,
    overrideAccess: false,
    user: null,
    select: {},
  });

  return docs;
}
