import { which, whichSync } from "./main.ts";
import { node_which } from "./dev_deps.ts";

// deno-fmt-ignore
const benchmarks: Deno.BenchDefinition[] = [
  { group: "whichSync-first", name: "deno-whichSync-first", fn: () => { whichSync("deno"); }, baseline: true },
  { group: "whichSync-first", name: "node-whichSync-first", fn: () => { node_which.sync("deno", { nothrow: true }); } },
  { group: "whichSync-all", name: "deno-whichSync-all", fn: () => { whichSync("deno", { all: true }); }, baseline: true },
  { group: "whichSync-all", name: "node-whichSync-all", fn: () => { node_which.sync("deno", { nothrow: true, all: true }); } },
  { group: "which-first", name: "deno-which-first", fn: async () => { await which("deno"); }, baseline: true },
  { group: "which-first", name: "node-which-first", fn: async () => { await node_which("deno"); } },
  { group: "which-all", name: "deno-which-all", fn: async () => { await which("deno", { all: true } ); }, baseline: true },
  { group: "which-all", name: "node-which-all", fn: async () => { await node_which("deno", { all: true }); } },
];

for (const benchmark of benchmarks) {
  Deno.bench(benchmark);
}
