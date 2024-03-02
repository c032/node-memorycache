import { describe, it } from "node:test";

describe("lib", () => {
  describe("cache", () => {
    describe("closure", () => {
      it.todo(
        "returns the cached value if the elapsed time is lower than the TTL",
      );
      it.todo(
        "fetches a new value if the elapsed time is higher or equal than the TTL",
      );
    });
  });
});
