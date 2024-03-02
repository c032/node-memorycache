import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { noop } from "./lib";

describe("lib", () => {
  describe("noop", () => {
    it("returns `null`", () => {
      const actual = noop();
      const expected = null;

      assert.equal(actual, expected);
    });
  });
});
