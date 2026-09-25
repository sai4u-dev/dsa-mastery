// SVG renderer + step animator for the DSA Visualization Engine.
// Contract used by index.html:
//   renderVisualization(algo, 'initial') -> { svg, legend }
//   animateAlgorithm(algo, container, stepInfo, onDone, stepMode=false, speed=1)
//     -> { stop(), step(), setSpeed(s), isStepMode, length }

const SVGNS = "http://www.w3.org/2000/svg";
const C = {
  base: "#58a6ff", compare: "#f0883e", swap: "#f85149",
  sorted: "#3fb950", pivot: "#a371f7", dim: "#21262d",
  edge: "#30363d", text: "#e6edf3", muted: "#8b949e",
};

function el(name, attrs = {}) {
  const n = document.createElementNS(SVGNS, name);
  for (const k of Object.keys(attrs)) n.setAttribute(k, attrs[k]);
  return n;
}
function svgText(parent, x, y, str, attrs = {}) {
  const t = el("text", Object.assign(
    { x, y, "text-anchor": "middle", fill: C.text, "font-size": 11, "font-family": "Consolas,monospace" }, attrs));
  t.textContent = str;
  parent.appendChild(t);
  return t;
}

// ---------------------------------------------------------------- demo data
const DEMO_ARRAY = [52, 18, 84, 33, 71, 9, 95, 44];
const BINARY_ARRAY = [2, 5, 8, 12, 16, 23, 38, 56];
const BINARY_TARGET = 23;
// Shared demo graph (BFS + DFS)
const GRAPH = {
  nodes: { A: [200, 34], B: [100, 100], C: [300, 100], D: [48, 168], E: [160, 168], F: [330, 168] },
  edges: [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"]],
  adj: { A: ["B", "C"], B: ["A", "D", "E"], C: ["A", "F"], D: ["B"], E: ["B"], F: ["C"] },
  start: "A",
};
// Weighted demo graph (Dijkstra): shortest S->T is S->A->T = 7
const WGRAPH = {
  nodes: { S: [52, 100], A: [185, 44], B: [185, 156], T: [348, 100] },
  edges: [["S", "A", 4], ["S", "B", 2], ["A", "T", 3], ["B", "T", 6]],
  adj: { S: [["A", 4], ["B", 2]], A: [["S", 4], ["T", 3]], B: [["S", 2], ["T", 6]], T: [["A", 3], ["B", 6]] },
  source: "S",
};

// ------------------------------------------------------- live configuration
// Custom user input wired from the index.html control panel (null = demo data).
const config = { array: null, target: 23, start: "A" };
export function configure(opts = {}) {
  if ("array" in opts) config.array = Array.isArray(opts.array) && opts.array.length ? opts.array.slice() : null;
  if ("target" in opts && Number.isFinite(+opts.target)) config.target = +opts.target;
  if ("start" in opts && GRAPH.nodes[opts.start]) config.start = opts.start;
}

// ------------------------------------------------------- step-trace builders
function sortedTail(n, count) {
  return Array.from({ length: count }, (_, k) => n - 1 - k);
}
function traceBubble(a) {
  const steps = [{ arr: a.slice(), compare: [], swap: [], sorted: [], pivot: -1, key: -1, msg: "Start — compare neighbours left to right." }];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ arr: a.slice(), compare: [j, j + 1], swap: [], sorted: sortedTail(n, i), pivot: -1, key: -1, msg: `Compare a[${j}]=${a[j]} vs a[${j + 1}]=${a[j + 1]}` });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; swapped = true;
        steps.push({ arr: a.slice(), compare: [], swap: [j, j + 1], sorted: sortedTail(n, i), pivot: -1, key: -1, msg: `Swap — ${a[j]} moves left` });
      }
    }
    steps.push({ arr: a.slice(), compare: [], swap: [], sorted: sortedTail(n, i + 1), pivot: -1, key: -1, msg: `Pass ${i + 1} done — ${i + 1} largest locked.` });
    if (!swapped) break;
  }
  steps.push({ arr: a.slice(), compare: [], swap: [], sorted: a.map((_, i) => i), pivot: -1, key: -1, msg: "✓ Sorted!" });
  return steps;
}
function traceSelection(a) {
  const steps = [{ arr: a.slice(), compare: [], swap: [], sorted: [], pivot: -1, key: -1, msg: "Start — find the minimum of the unsorted part." }];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let m = i;
    const done = Array.from({ length: i }, (_, k) => k);
    for (let j = i + 1; j < n; j++) {
      steps.push({ arr: a.slice(), compare: [m, j], swap: [], sorted: done, pivot: m, key: -1, msg: `Compare min ${a[m]} vs a[${j}]=${a[j]}` });
      if (a[j] < a[m]) { m = j; steps.push({ arr: a.slice(), compare: [], swap: [], sorted: done, pivot: m, key: -1, msg: `New minimum a[${m}]=${a[m]}` }); }
    }
    if (m !== i) [a[i], a[m]] = [a[m], a[i]];
    steps.push({ arr: a.slice(), compare: [], swap: m !== i ? [i, m] : [], sorted: Array.from({ length: i + 1 }, (_, k) => k), pivot: -1, key: -1, msg: m !== i ? `Swap minimum ${a[i]} into position ${i}` : `Position ${i} already minimal ✓` });
  }
  steps.push({ arr: a.slice(), compare: [], swap: [], sorted: a.map((_, i) => i), pivot: -1, key: -1, msg: "✓ Sorted!" });
  return steps;
}
function traceInsertion(a) {
  const steps = [{ arr: a.slice(), compare: [], swap: [], sorted: [0], pivot: -1, key: 1, msg: "Start — left of the key is sorted." }];
  for (let i = 1; i < a.length; i++) {
    const key = a[i]; let j = i - 1;
    steps.push({ arr: a.slice(), compare: [], swap: [], sorted: Array.from({ length: i }, (_, k) => k), pivot: -1, key: i, msg: `key = a[${i}] = ${key} — shift larger elements right` });
    while (j >= 0) {
      steps.push({ arr: a.slice(), compare: [j, j + 1], swap: [], sorted: Array.from({ length: i }, (_, k) => k), pivot: -1, key: j + 1, msg: `Is a[${j}]=${a[j]} > key ${key}?` });
      if (a[j] > key) {
        a[j + 1] = a[j]; j--;
        steps.push({ arr: a.slice(), compare: [], swap: [j + 1, j + 2], sorted: Array.from({ length: i }, (_, k) => k), pivot: -1, key: Math.max(0, j + 1), msg: `Shift right — hole moves to ${j + 1}` });
      } else break;
    }
    a[j + 1] = key;
    steps.push({ arr: a.slice(), compare: [], swap: [j + 1], sorted: Array.from({ length: i + 1 }, (_, k) => k), pivot: -1, key: -1, msg: `Insert key ${key} at ${j + 1} ✓` });
  }
  steps.push({ arr: a.slice(), compare: [], swap: [], sorted: a.map((_, i) => i), pivot: -1, key: -1, msg: "✓ Sorted!" });
  return steps;
}
function traceMerge(a) {
  const steps = [{ arr: a.slice(), compare: [], swap: [], sorted: [], pivot: -1, key: -1, msg: "Start — divide, then merge sorted runs." }];
  function rec(l, r) {
    if (l >= r) return;
    const m = (l + r) >> 1;
    rec(l, m); rec(m + 1, r);
    const L = a.slice(l, m + 1), R = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    steps.push({ arr: a.slice(), compare: [l, r], swap: [], sorted: [], pivot: -1, key: -1, msg: `Merge [${L}] + [${R}]` });
    while (i < L.length && j < R.length) {
      steps.push({ arr: a.slice(), compare: [l + i, m + 1 + j], swap: [], sorted: [], pivot: -1, key: -1, msg: `Pick smaller: ${L[i]} vs ${R[j]}` });
      a[k] = L[i] <= R[j] ? L[i++] : R[j++]; k++;
      steps.push({ arr: a.slice(), compare: [], swap: [k - 1], sorted: [], pivot: -1, key: -1, msg: `Write a[${k - 1}] = ${a[k - 1]}` });
    }
    while (i < L.length) { a[k] = L[i++]; k++; steps.push({ arr: a.slice(), compare: [], swap: [k - 1], sorted: [], pivot: -1, key: -1, msg: `Drain left → a[${k - 1}] = ${a[k - 1]}` }); }
    while (j < R.length) { a[k] = R[j++]; k++; steps.push({ arr: a.slice(), compare: [], swap: [k - 1], sorted: [], pivot: -1, key: -1, msg: `Drain right → a[${k - 1}] = ${a[k - 1]}` }); }
  }
  rec(0, a.length - 1);
  steps.push({ arr: a.slice(), compare: [], swap: [], sorted: a.map((_, i) => i), pivot: -1, key: -1, msg: "✓ Sorted!" });
  return steps;
}
function traceQuick(a) {
  const steps = [{ arr: a.slice(), compare: [], swap: [], sorted: [], pivot: a.length - 1, key: -1, msg: "Start — Lomuto partition, pivot = last element." }];
  function qs(lo, hi) {
    if (lo > hi) return;
    if (lo === hi) { steps.push({ arr: a.slice(), compare: [], swap: [], sorted: [lo], pivot: lo, key: -1, msg: `Single element a[${lo}] placed ✓` }); return; }
    const piv = a[hi]; let i = lo;
    steps.push({ arr: a.slice(), compare: [], swap: [], sorted: [], pivot: hi, key: -1, msg: `Partition [${lo}..${hi}] — pivot = ${piv}` });
    for (let j = lo; j < hi; j++) {
      steps.push({ arr: a.slice(), compare: [j, hi], swap: [], sorted: [], pivot: hi, key: -1, msg: `a[${j}]=${a[j]} ≤ pivot ${piv}?` });
      if (a[j] <= piv) {
        if (i !== j) { [a[i], a[j]] = [a[j], a[i]]; steps.push({ arr: a.slice(), compare: [], swap: [i, j], sorted: [], pivot: hi, key: -1, msg: `Swap a[${i}] ↔ a[${j}] (≤ zone grows)` }); }
        i++;
      }
    }
    if (i !== hi) [a[i], a[hi]] = [a[hi], a[i]];
    steps.push({ arr: a.slice(), compare: [], swap: [i, hi], sorted: [i], pivot: i, key: -1, msg: `Pivot ${piv} lands at ${i} ✓ — recurse both sides` });
    qs(lo, i - 1); qs(i + 1, hi);
  }
  qs(0, a.length - 1);
  steps.push({ arr: a.slice(), compare: [], swap: [], sorted: a.map((_, i) => i), pivot: -1, key: -1, msg: "✓ Sorted!" });
  return steps;
}
function traceHeap(a) {
  const steps = [{ arr: a.slice(), compare: [], swap: [], sorted: [], pivot: -1, key: -1, msg: "Start — build a max-heap bottom-up." }];
  const n = a.length;
  function heapify(sz, i) {
    let big = i; const L = 2 * i + 1, R = 2 * i + 2;
    if (L < sz) { steps.push({ arr: a.slice(), compare: [big, L], swap: [], sorted: [], pivot: -1, key: -1, msg: `Heapify: a[${big}]=${a[big]} vs left ${a[L]}` }); if (a[L] > a[big]) big = L; }
    if (R < sz) { steps.push({ arr: a.slice(), compare: [big, R], swap: [], sorted: [], pivot: -1, key: -1, msg: `vs right a[${R}]=${a[R]}` }); if (a[R] > a[big]) big = R; }
    if (big !== i) {
      [a[i], a[big]] = [a[big], a[i]];
      steps.push({ arr: a.slice(), compare: [], swap: [i, big], sorted: [], pivot: -1, key: -1, msg: `Swap heap nodes ${i} ↔ ${big}` });
      heapify(sz, big);
    }
  }
  for (let i = (n >> 1) - 1; i >= 0; i--) heapify(n, i);
  steps.push({ arr: a.slice(), compare: [], swap: [], sorted: [], pivot: -1, key: -1, msg: "Max-heap built — root is the maximum." });
  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    steps.push({ arr: a.slice(), compare: [], swap: [0, end], sorted: sortedTail(n, n - end), pivot: -1, key: -1, msg: `Extract max ${a[end]} → position ${end}` });
    heapify(end, 0);
  }
  steps.push({ arr: a.slice(), compare: [], swap: [], sorted: a.map((_, i) => i), pivot: -1, key: -1, msg: "✓ Sorted!" });
  return steps;
}
function traceBinary() {
  const a = (config.array || BINARY_ARRAY).slice().sort((x, y) => x - y);
  const t = config.target;
  const steps = [{ arr: a, low: 0, high: a.length - 1, mid: -1, found: -1, target: t, msg: `Find ${t} — array auto-sorted, check middle, discard half.` }];
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    steps.push({ arr: a, low: lo, high: hi, mid, found: -1, target: t, msg: `mid=${mid} → a[mid]=${a[mid]} vs target ${t}` });
    if (a[mid] === t) {
      steps.push({ arr: a, low: lo, high: hi, mid, found: mid, target: t, msg: `✓ Found ${t} at index ${mid}!` });
      return steps;
    } else if (a[mid] < t) { lo = mid + 1; steps.push({ arr: a, low: lo, high: hi, mid: -1, found: -1, target: t, msg: `${a[mid]} < ${t} — search RIGHT half [${lo}..${hi}]` }); }
    else { hi = mid - 1; steps.push({ arr: a, low: lo, high: hi, mid: -1, found: -1, target: t, msg: `${a[mid]} > ${t} — search LEFT half [${lo}..${hi}]` }); }
  }
  steps.push({ arr: a, low: -1, high: -1, mid: -1, found: -1, target: t, msg: `${t} is not in the array.` });
  return steps;
}
function traceBFS() {
  const S = GRAPH.nodes[config.start] ? config.start : "A";
  const order = [], visited = new Set([S]), queue = [S];
  const steps = [{ visited: [], current: null, fringe: [], msg: `Start BFS at ${S} — queue = [${S}]` }];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    const snaps = queue.slice();
    for (const v of GRAPH.adj[u]) if (!visited.has(v)) { visited.add(v); queue.push(v); }
    steps.push({ visited: order.slice(), current: u, fringe: snaps, msg: `Visit ${u} — enqueue new neighbours → queue = [${queue.join(", ")}]` });
  }
  steps.push({ visited: order.slice(), current: null, fringe: [], msg: `✓ BFS order: ${order.join(" → ")}` });
  return steps;
}
function traceDFS() {
  const S = GRAPH.nodes[config.start] ? config.start : "A";
  const order = [], visited = new Set(), stack = [S];
  const steps = [{ visited: [], current: null, fringe: [], msg: `Start DFS at ${S} — dive deep first.` }];
  while (stack.length) {
    const u = stack.pop();
    if (visited.has(u)) { steps.push({ visited: order.slice(), current: u, fringe: stack.slice(), msg: `${u} already visited — backtrack` }); continue; }
    visited.add(u); order.push(u);
    for (let k = GRAPH.adj[u].length - 1; k >= 0; k--) {
      const v = GRAPH.adj[u][k];
      if (!visited.has(v)) stack.push(v);
    }
    steps.push({ visited: order.slice(), current: u, fringe: stack.slice(), msg: `Visit ${u} — push unvisited neighbours → stack = [${stack.join(", ") || "∅"}]` });
  }
  steps.push({ visited: order.slice(), current: null, fringe: [], msg: `✓ DFS order: ${order.join(" → ")}` });
  return steps;
}
function traceDijkstra() {
  const dist = { S: 0, A: Infinity, B: Infinity, T: Infinity };
  const settled = [];
  const fmt = (d) => (d === Infinity ? "∞" : d);
  const steps = [{ dist: Object.assign({}, dist), settled: [], current: null, msg: "dist[S]=0, rest ∞ — pop the closest unsettled node." }];
  while (settled.length < 4) {
    let u = null;
    for (const k of ["S", "A", "B", "T"]) {
      if (!settled.includes(k) && (u === null || dist[k] < dist[u])) u = k;
    }
    settled.push(u);
    steps.push({ dist: Object.assign({}, dist), settled: settled.slice(), current: u, msg: `Settle ${u} at distance ${fmt(dist[u])} ✓` });
    for (const [v, w] of WGRAPH.adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        steps.push({ dist: Object.assign({}, dist), settled: settled.slice(), current: u, msg: `Relax ${u}→${v} (w=${w}): dist[${v}] = ${fmt(dist[v])}` });
      }
    }
  }
  steps.push({ dist: Object.assign({}, dist), settled: settled.slice(), current: null, msg: `✓ Shortest S→T = ${dist.T} via S→A→T (4+3)` });
  return steps;
}

const SORT_TRACERS = { bubble: traceBubble, selection: traceSelection, insertion: traceInsertion, merge: traceMerge, quick: traceQuick, heap: traceHeap };

// Build the full step list for an algorithm (pure logic — also used by tests).
export function buildSteps(algo) {
  if (algo.viz === "bars") return SORT_TRACERS[algo.id]((config.array || DEMO_ARRAY).slice());
  if (algo.viz === "binary") return traceBinary();
  if (algo.viz === "dijkstra") return traceDijkstra();
  return algo.traversal === "dfs" ? traceDFS() : traceBFS();
}

// ---------------------------------------------------------------- painters
function paintBars(st) {
  const svg = el("svg", { viewBox: "0 0 400 200" });
  const arr = st.arr, max = Math.max(...arr, 1), n = arr.length, bw = 400 / n;
  arr.forEach((v, i) => {
    const h = Math.max(5, (v / max) * 150), x = i * bw + 2, y = 168 - h, w = Math.max(2, bw - 4);
    let fill = C.base;
    if (st.sorted && st.sorted.includes(i)) fill = C.sorted;
    if (i === st.pivot || i === st.key) fill = C.pivot;
    if (st.compare && st.compare.includes(i)) fill = C.compare;
    if (st.swap && st.swap.includes(i)) fill = C.swap;
    svg.appendChild(el("rect", { x: x.toFixed(1), y: y.toFixed(1), width: w.toFixed(1), height: h.toFixed(1), rx: 3, fill }));
    if (bw > 34) svgText(svg, x + w / 2, 186, String(v), { "font-size": 10, fill: C.muted });
  });
  return svg;
}
function paintBinary(st) {
  const svg = el("svg", { viewBox: "0 0 400 200" });
  const arr = st.arr, n = arr.length, cw = 400 / n;
  arr.forEach((v, i) => {
    const inRange = i >= st.low && i <= st.high;
    let fill = C.base;
    if (!inRange && st.found !== i) fill = C.dim;
    if (i === st.low || i === st.high) fill = C.pivot;
    if (i === st.mid) fill = C.compare;
    if (i === st.found) fill = C.sorted;
    svg.appendChild(el("rect", { x: i * cw + 2, y: 60, width: cw - 4, height: 46, rx: 8, fill, stroke: C.edge }));
    svgText(svg, i * cw + cw / 2, 88, String(v), { "font-size": 14, "font-weight": "700" });
    svgText(svg, i * cw + cw / 2, 122, String(i), { "font-size": 10, fill: C.muted });
    if (i === st.low) svgText(svg, i * cw + cw / 2, 52, "L", { "font-size": 10, fill: C.pivot });
    if (i === st.high) svgText(svg, i * cw + cw / 2, 52, "H", { "font-size": 10, fill: C.pivot });
    if (i === st.mid) svgText(svg, i * cw + cw / 2, 140, "MID", { "font-size": 10, fill: C.compare });
  });
  svgText(svg, 200, 168, `target = ${st.target}`, { fill: C.muted, "font-size": 12 });
  return svg;
}
function paintGraphNodes(svg, nodes, colorOf, subOf) {
  for (const k of Object.keys(nodes)) {
    const [x, y] = nodes[k];
    svg.appendChild(el("circle", { cx: x, cy: y, r: 17, fill: colorOf(k), stroke: C.edge, "stroke-width": 2 }));
    svgText(svg, x, y + 5, k, { "font-size": 14, "font-weight": "700", fill: "#0d1117" });
    if (subOf) svgText(svg, x, y + 36, subOf(k), { "font-size": 10, fill: C.muted });
  }
}
function paintGraph(st) {
  const svg = el("svg", { viewBox: "0 0 400 200" });
  for (const [u, v] of GRAPH.edges) {
    const [x1, y1] = GRAPH.nodes[u], [x2, y2] = GRAPH.nodes[v];
    const hot = st.visited.includes(u) && st.visited.includes(v);
    svg.appendChild(el("line", { x1, y1, x2, y2, stroke: hot ? C.compare : C.edge, "stroke-width": hot ? 3 : 2 }));
  }
  paintGraphNodes(svg, GRAPH.nodes,
    (k) => (k === st.current ? C.compare : st.visited.includes(k) ? C.sorted : C.base),
    (k) => (st.visited.includes(k) ? `✓#${st.visited.indexOf(k) + 1}` : ""));
  const label = st.current ? `at ${st.current}` : "done";
  const fringe = st.fringe && st.fringe.length ? `[${st.fringe.join(", ")}]` : "[∅]";
  svgText(svg, 200, 14, `${label}   fringe ${fringe}`, { fill: C.muted, "font-size": 11 });
  return svg;
}
function paintDijkstra(st) {
  const svg = el("svg", { viewBox: "0 0 400 200" });
  for (const [u, v, w] of WGRAPH.edges) {
    const [x1, y1] = WGRAPH.nodes[u], [x2, y2] = WGRAPH.nodes[v];
    const done = st.settled.includes(u) && st.settled.includes(v);
    svg.appendChild(el("line", { x1, y1, x2, y2, stroke: done ? C.sorted : C.edge, "stroke-width": done ? 3 : 2 }));
    svgText(svg, (x1 + x2) / 2, (y1 + y2) / 2 - 6, String(w), { "font-size": 12, "font-weight": "700", fill: C.muted });
  }
  const fmt = (d) => (d === Infinity ? "∞" : String(d));
  paintGraphNodes(svg, WGRAPH.nodes,
    (k) => (k === st.current ? C.compare : st.settled.includes(k) ? C.sorted : C.base),
    (k) => `d=${fmt(st.dist[k])}${st.settled.includes(k) ? " ✓" : ""}`);
  return svg;
}
function paintStep(algo, st) {
  if (algo.viz === "binary") return paintBinary(st);
  if (algo.viz === "graph") return paintGraph(st);
  if (algo.viz === "dijkstra") return paintDijkstra(st);
  return paintBars(st);
}

// ---------------------------------------------------------------- legends
const LEGENDS = {
  bars: `<span class="legend-item"><span class="legend-color" style="background:#58a6ff"></span>value</span>
         <span class="legend-item"><span class="legend-color" style="background:#f0883e"></span>compare</span>
         <span class="legend-item"><span class="legend-color" style="background:#f85149"></span>swap/write</span>
         <span class="legend-item"><span class="legend-color" style="background:#a371f7"></span>pivot/key</span>
         <span class="legend-item"><span class="legend-color" style="background:#3fb950"></span>sorted</span>`,
  binary: `<span class="legend-item"><span class="legend-color" style="background:#a371f7"></span>low/high</span>
         <span class="legend-item"><span class="legend-color" style="background:#f0883e"></span>mid</span>
         <span class="legend-item"><span class="legend-color" style="background:#3fb950"></span>found</span>
         <span class="legend-item"><span class="legend-color" style="background:#21262d"></span>discarded</span>`,
  graph: `<span class="legend-item"><span class="legend-color" style="background:#58a6ff"></span>unvisited</span>
         <span class="legend-item"><span class="legend-color" style="background:#f0883e"></span>current</span>
         <span class="legend-item"><span class="legend-color" style="background:#3fb950"></span>visited ✓#order</span>`,
  dijkstra: `<span class="legend-item"><span class="legend-color" style="background:#58a6ff"></span>unsettled</span>
         <span class="legend-item"><span class="legend-color" style="background:#f0883e"></span>current</span>
         <span class="legend-item"><span class="legend-color" style="background:#3fb950"></span>settled ✓</span>`,
};

// ------------------------------------------------------------------ public
export function renderVisualization(algo, _mode) {
  const steps = buildSteps(algo);
  const svg = paintStep(algo, steps[0]);
  return { svg, legend: LEGENDS[algo.viz] || LEGENDS.bars };
}

export function animateAlgorithm(algo, container, stepInfo, onDone, stepMode = false, speed = 1) {
  const steps = buildSteps(algo);
  let idx = 0, timer = null, delay = Math.max(60, 550 / speed);

  // Cumulative operation counters (comparisons + swaps/writes/probes per step).
  let runC = 0, runS = 0;
  const statC = steps.map((st) => {
    if ((st.compare && st.compare.length) || (st.mid !== undefined && st.mid >= 0)) runC += 1;
    if (st.swap && st.swap.length) runS += 1;
    return [runC, runS];
  });

  function draw() {
    container.innerHTML = "";
    container.appendChild(paintStep(algo, steps[idx]));
    let extra = "";
    if (algo.viz === "bars") extra = ` · cmp ${statC[idx][0]} · writes ${statC[idx][1]}`;
    else if (algo.viz === "binary") extra = ` · probes ${statC[idx][0]}`;
    stepInfo.textContent = `Step ${idx + 1}/${steps.length}${extra} — ${steps[idx].msg}`;
  }
  function finish() {
    stop();
    if (onDone) onDone();
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function advance() {
    if (idx < steps.length - 1) { idx++; draw(); }
    if (idx >= steps.length - 1) finish();
  }

  draw();
  if (!stepMode) timer = setInterval(advance, delay);

  return {
    stop,
    step: advance,
    setSpeed(s) {
      delay = Math.max(60, 550 / s);
      if (timer) { stop(); timer = setInterval(advance, delay); }
    },
    isStepMode: stepMode,
    length: steps.length,
  };
}
