"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
(0, node_test_1.describe)("lib", () => {
    (0, node_test_1.describe)("cache", () => {
        (0, node_test_1.describe)("closure", () => {
            node_test_1.it.todo("returns the cached value if the elapsed time is lower than the TTL");
            node_test_1.it.todo("fetches a new value if the elapsed time is higher or equal than the TTL");
        });
    });
});
