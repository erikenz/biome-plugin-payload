import type { Payload } from "payload";

export async function findVersionsDepthWithoutPopulate(payload: Payload) {
  const versions = await payload.findVersions({
    collection: "posts",
    depth: 1,
    overrideAccess: true,
    select: { version: { author: true } },
  });

  return versions;
}
