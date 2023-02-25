// @deno-types="npm:@types/which"
import { default as node_which } from "node-which";

import { which, whichSync } from "./main.ts";

import { S_EXEC } from "./inode.ts";
import * as Assert from "asserts";

const testDefinition: Omit<Deno.TestDefinition, "fn" | "name"> = {
  sanitizeOps: true,
  sanitizeResources: true,
};

Deno.test("Bitmask", testDefinition, () => {
  Assert.assertStrictEquals(
    "0o111",
    "0o" + S_EXEC.toString(8),
  );
});

Deno.test("which", testDefinition, async () => {
  const DENO = Deno.execPath();
  Assert.assertEquals(await which("deno"), DENO);
  Assert.assertEquals(await which("deno", { all: true }), [DENO]);
});

Deno.test("whichSync", testDefinition, () => {
  const DENO = Deno.execPath();
  Assert.assertEquals(whichSync("deno"), DENO);
  Assert.assertEquals(whichSync("deno", { all: true }), [DENO]);
});

Deno.test("node-which vs deno-which", testDefinition, async () => {
  Assert.assertEquals(
    await which("deno", { all: true }),
    await node_which("deno", { all: true }),
  );
});
Deno.test("node-whichSync vs deno-whichSync", testDefinition, () => {
  Assert.assertEquals(
    whichSync("deno", { all: true }),
    node_which.sync("deno", { all: true }),
  );
});
