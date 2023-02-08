import { which, whichSync } from "./main.ts";
import { node_which } from "./dev_deps.ts";

// deno-fmt-ignore
const denoWhichVsNodeWhich: Deno.BenchDefinition[] = [
  { baseline: true,
    group: "whichSync-first", name: "deno-whichSync-first", fn: () => { whichSync("deno"); } },
  { group: "whichSync-first", name: "node-whichSync-first", fn: () => { node_which.sync("deno", { nothrow: true }); } },

  { baseline: true,
    group: "whichSync-all", name: "deno-whichSync-all", fn: () => { whichSync("deno", { all: true }); } },
  { group: "whichSync-all", name: "node-whichSync-all", fn: () => { node_which.sync("deno", { all: true,nothrow: true, }); } },

  { baseline: true ,
    group: "which-first", name: "deno-which-first", fn: async () => { await which("deno"); }},
  { group: "which-first", name: "node-which-first", fn: async () => { await node_which("deno"); }},

  { baseline: true,
    group: "which-all", name: "deno-which-all", fn: async () => { await which("deno", { all: true }); } },
  { group: "which-all", name: "node-which-all", fn: async () => { await node_which("deno", { all: true }); } },
];

for (const benchmark of denoWhichVsNodeWhich) {
  Deno.bench(benchmark);
}

// deno-fmt-ignore
const denoWhich: Deno.BenchDefinition[] = [
  { group: "deno-which-first", name: "deno-whichSync-first", fn: () => { whichSync("deno");                        }, },
  { group: "deno-which-all",   name: "deno-whichSync-all",   fn: () => { whichSync("deno", { all: true });         }, },
  { group: "deno-which-first", name: "deno-which-first",     fn: async () => { await which("deno");                }, },
  { group: "deno-which-all",   name: "deno-which-all",       fn: async () => { await which("deno", { all: true }); }, },
];
for (const benchmark of denoWhich) {
  Deno.bench(benchmark);
}
