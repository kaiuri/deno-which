## (WIP) Implementation of `node-which` for Deno

## Benchmarks

```text
deno-whichSync-first  114.73 µs/iter  (84.53 µs … 693.99 µs)  115.1 µs 133.17 µs 150.28 µs
node-whichSync-first  200.19 µs/iter (152.63 µs … 656.23 µs) 202.97 µs 222.32 µs 257.89 µs

summary
  deno-whichSync-first
   1.74x faster than node-whichSync-first

deno-whichSync-all    239.09 µs/iter   (215.97 µs … 1.14 ms) 239.27 µs  265.3 µs 423.12 µs
node-whichSync-all    532.77 µs/iter (455.97 µs … 870.26 µs) 539.21 µs 589.91 µs 618.97 µs

summary
  deno-whichSync-all
   2.23x faster than node-whichSync-all

deno-which-first      107.21 µs/iter    (89.97 µs … 1.08 ms) 106.86 µs 192.66 µs 276.25 µs
node-which-first      163.76 µs/iter  (133.43 µs … 622.8 µs) 165.47 µs  242.5 µs 263.02 µs

summary
  deno-which-first
   1.53x faster than node-which-first

deno-which-all        282.47 µs/iter (238.29 µs … 805.41 µs) 307.98 µs 357.33 µs 450.11 µs
node-which-all        368.39 µs/iter   (312.69 µs … 1.32 ms) 359.49 µs   1.03 ms   1.04 ms

summary
  deno-which-all
   1.3x faster than node-which-all
```
