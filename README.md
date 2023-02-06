## (WIP) Implementation of `node-which` for Deno

## Benchmarks

```text
cpu: 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz
runtime: deno 1.30.2 (x86_64-unknown-linux-gnu)

benchmark                 time (avg)             (min … max)       p75       p99      p995
------------------------------------------------------------ -----------------------------
deno-whichSync-first  119.26 µs/iter  (84.96 µs … 783.31 µs) 118.17 µs 173.49 µs 201.55 µs
node-whichSync-first  205.59 µs/iter (156.61 µs … 519.11 µs) 207.15 µs 255.68 µs 279.21 µs

summary
  deno-whichSync-first
   1.72x faster than node-whichSync-first

deno-whichSync-all    249.71 µs/iter (231.06 µs … 588.23 µs) 251.33 µs 290.43 µs 340.74 µs
node-whichSync-all     545.8 µs/iter (463.96 µs … 825.43 µs) 551.35 µs 606.34 µs 620.33 µs

summary
  deno-whichSync-all
   2.19x faster than node-whichSync-all

deno-which-first      120.03 µs/iter     (90.02 µs … 1.1 ms) 109.25 µs 762.94 µs 819.95 µs
node-which-first      161.12 µs/iter (125.43 µs … 992.44 µs) 152.45 µs 461.43 µs 772.25 µs

summary
  deno-which-first
   1.34x faster than node-which-first

deno-which-all        270.84 µs/iter   (222.71 µs … 1.01 ms) 259.76 µs 849.69 µs 919.08 µs
node-which-all        394.99 µs/iter   (357.61 µs … 1.02 ms) 380.39 µs  833.1 µs 877.72 µs

summary
  deno-which-all
   1.46x faster than node-which-all
```
