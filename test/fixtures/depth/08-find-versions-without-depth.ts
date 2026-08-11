import type { Payload } from "payload";

export async function findVersionsWithoutDepth(payload: Payload) {
  const versions = await payload.findVersions({
    collection: "posts",
    overrideAccess: true,
    select: { version: true },
  });

  const version = await payload.findVersionByID({
    collection: "posts",
    id: "abc",
    overrideAccess: true,
    select: { version: true },
  });

  return { versions, version };
}
