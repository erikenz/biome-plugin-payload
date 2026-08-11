import type { Payload } from "payload";

export class QueryRunner {
  private readonly payload: Payload;

  constructor(payload: Payload) {
    this.payload = payload;
  }

  find() {
    return this.payload.find({
      collection: "posts",
      depth: 0,
      overrideAccess: true,
    });
  }
}
