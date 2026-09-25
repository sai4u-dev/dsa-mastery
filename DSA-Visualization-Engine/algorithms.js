// Top-10 algorithms dataset for the DSA Visualization Engine.
// Each entry drives the card grid (index.html) and the SVG renderer (renderer.js).
// viz: 'bars' (sorting) | 'binary' (binary search) | 'graph' (BFS/DFS) | 'dijkstra'

export const algorithms = [
  {
    id: "bubble",
    name: "Bubble Sort",
    icon: "🫧",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    viz: "bars",
    explanation: `
      <h3>What it is</h3>
      <p>Bubble Sort repeatedly walks through the array, comparing <code>adjacent pairs</code> and swapping them when out of order. After each pass the largest unsorted value "bubbles up" to its final position at the end.</p>
      <h3>How it works</h3>
      <p>1. Compare <code>a[0]</code> vs <code>a[1]</code>, then <code>a[1]</code> vs <code>a[2]</code>, and so on.<br>2. Swap any inverted pair — the bigger value drifts right.<br>3. After pass <code>i</code>, the last <code>i</code> elements are locked. Repeat until a pass makes zero swaps (early exit).</p>
      <h3>Complexity</h3>
      <p>Best <code>O(n)</code> on sorted input (one clean pass), otherwise <code>O(n²)</code> time and <code>O(1)</code> extra space. Stable and in-place — mainly a teaching algorithm.</p>
      <h3>Pseudocode</h3>
      <pre><code>for i in 0..n-1:\n  swapped = false\n  for j in 0..n-2-i:\n    if a[j] > a[j+1]: swap; swapped = true\n  if not swapped: break</code></pre>`,
  },
  {
    id: "selection",
    name: "Selection Sort",
    icon: "🎯",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    viz: "bars",
    explanation: `
      <h3>What it is</h3>
      <p>Selection Sort grows a sorted prefix one element at a time by <code>selecting the minimum</code> of the remaining unsorted part and swapping it into place.</p>
      <h3>How it works</h3>
      <p>1. Scan indices <code>i..n-1</code> tracking the smallest value seen.<br>2. Swap that minimum with position <code>i</code>.<br>3. Advance <code>i</code> — the prefix <code>[0..i]</code> is now sorted. Exactly <code>n-1</code> swaps total.</p>
      <h3>Complexity</h3>
      <p>Always <code>O(n²)</code> comparisons (it never adapts), <code>O(1)</code> space. Not stable, but useful when swaps are expensive.</p>
      <h3>Pseudocode</h3>
      <pre><code>for i in 0..n-1:\n  minIdx = argmin(a[i..n-1])\n  swap(a[i], a[minIdx])</code></pre>`,
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    icon: "📥",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    viz: "bars",
    explanation: `
      <h3>What it is</h3>
      <p>Insertion Sort plays cards like a card sharp: it keeps a sorted hand on the left and <code>inserts each new card</code> into its correct slot, shifting bigger cards right.</p>
      <h3>How it works</h3>
      <p>1. Take <code>key = a[i]</code>; everything left of <code>i</code> is already sorted.<br>2. Shift every element larger than <code>key</code> one slot right.<br>3. Drop <code>key</code> into the hole that opens up.</p>
      <h3>Complexity</h3>
      <p>Best <code>O(n)</code> on nearly-sorted data, worst <code>O(n²)</code>, <code>O(1)</code> space. Stable, in-place and online (handles streaming input).</p>
      <h3>Pseudocode</h3>
      <pre><code>for i in 1..n-1:\n  key = a[i]; j = i - 1\n  while j >= 0 and a[j] > key:\n    a[j+1] = a[j]; j--\n  a[j+1] = key</code></pre>`,
  },
  {
    id: "merge",
    name: "Merge Sort",
    icon: "🔀",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    viz: "bars",
    explanation: `
      <h3>What it is</h3>
      <p>Merge Sort is the classic <code>divide and conquer</code> sorter: split the array in half, recursively sort each half, then merge the two sorted runs with a linear two-pointer walk.</p>
      <h3>How it works</h3>
      <p>1. <b>Divide:</b> split <code>[l..r]</code> at the midpoint until pieces have size 1 (trivially sorted).<br>2. <b>Conquer:</b> merge pairs back — repeatedly take the smaller front element of the two runs.<br>3. Each merge level costs <code>O(n)</code>; there are <code>log n</code> levels.</p>
      <h3>Complexity</h3>
      <p>Guaranteed <code>O(n log n)</code> in all cases, stable — at the cost of <code>O(n)</code> extra space. Recurrence: <code>T(n) = 2T(n/2) + O(n)</code>.</p>
      <h3>Pseudocode</h3>
      <pre><code>sort(l, r):\n  if l >= r: return\n  mid = (l + r) // 2\n  sort(l, mid); sort(mid+1, r)\n  merge(l, mid, r)  # linear two-pointer merge</code></pre>`,
  },
  {
    id: "quick",
    name: "Quick Sort",
    icon: "⚡",
    category: "sorting",
    timeComplexity: "O(n log n)*",
    spaceComplexity: "O(log n)",
    viz: "bars",
    explanation: `
      <h3>What it is</h3>
      <p>Quick Sort picks a <code>pivot</code>, partitions the array so smaller values land left and larger ones right, then recurses on both sides. The fastest general-purpose sorter in practice.</p>
      <h3>How it works (Lomuto partition)</h3>
      <p>1. Choose the last element as pivot (purple).<br>2. Sweep <code>j</code> across the range; whenever <code>a[j] ≤ pivot</code>, swap it into the growing <code>≤</code> zone.<br>3. Drop the pivot right after that zone — it is now final. Recurse left and right.</p>
      <h3>Complexity</h3>
      <p>Expected <code>O(n log n)</code> (random pivots), worst <code>O(n²)</code> on adversarial input, <code>O(log n)</code> stack space. In-place but not stable.</p>
      <h3>Pseudocode</h3>
      <pre><code>partition(lo, hi):  # pivot = a[hi]\n  i = lo\n  for j in lo..hi-1:\n    if a[j] <= pivot: swap(a[i], a[j]); i++\n  swap(a[i], a[hi]); return i\nquicksort(lo, i-1); quicksort(i+1, hi)</code></pre>`,
  },
  {
    id: "heap",
    name: "Heap Sort",
    icon: "⛰️",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    viz: "bars",
    explanation: `
      <h3>What it is</h3>
      <p>Heap Sort turns the array into a <code>max-heap</code> (every parent ≥ its children), then repeatedly extracts the maximum — swap root with the last heap slot, shrink the heap, restore the heap property.</p>
      <h3>How it works</h3>
      <p>1. <b>Build-heap</b> bottom-up with <code>heapify</code> — <code>O(n)</code>.<br>2. Swap root (max) to the end of the unsorted region.<br>3. <code>Heapify</code> the new root down and repeat until one element remains.</p>
      <h3>Complexity</h3>
      <p>Guaranteed <code>O(n log n)</code>, in-place <code>O(1)</code> space, but not stable. The same heap idea powers priority queues.</p>
      <h3>Pseudocode</h3>
      <pre><code>buildMaxHeap()           # bottom-up heapify\nfor end in n-1..1:\n  swap(a[0], a[end])   # extract max\n  heapify(0, heapSize=end)</code></pre>`,
  },
  {
    id: "binary",
    name: "Binary Search",
    icon: "🔍",
    category: "searching",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    viz: "binary",
    explanation: `
      <h3>What it is</h3>
      <p>Binary Search finds a target in a <code>sorted</code> array by checking the middle element and discarding the half that cannot contain the answer — halving the search space every step.</p>
      <h3>How it works</h3>
      <p>1. Set <code>low = 0</code>, <code>high = n-1</code>.<br>2. <code>mid = (low+high)//2</code> — if <code>a[mid]</code> equals the target, done.<br>3. Target smaller? Search left (<code>high = mid-1</code>). Larger? Search right (<code>low = mid+1</code>). Repeat.</p>
      <h3>Complexity</h3>
      <p><code>O(log n)</code> time, <code>O(1)</code> space. Requires sorted input — e.g. ~20 probes for a million elements. Foundation of bisect, lower-bound and rotated-array problems.</p>
      <h3>Pseudocode</h3>
      <pre><code>while low <= high:\n  mid = (low + high) // 2\n  if a[mid] == target: return mid\n  elif a[mid] < target: low = mid + 1\n  else: high = mid - 1\nreturn -1</code></pre>`,
  },
  {
    id: "bfs",
    name: "BFS Traversal",
    icon: "🌊",
    category: "graph",
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V)",
    viz: "graph",
    traversal: "bfs",
    explanation: `
      <h3>What it is</h3>
      <p>Breadth-First Search explores a graph <code>level by level</code> using a queue — like a wavefront rippling outward from the start node. Neighbours are visited before going deeper.</p>
      <h3>How it works</h3>
      <p>1. Enqueue the start node and mark it visited.<br>2. Dequeue the front node, visit it, enqueue all unvisited neighbours.<br>3. Repeat until the queue drains. Order here: <code>A → B → C → D → E → F</code>.</p>
      <h3>Complexity</h3>
      <p><code>O(V+E)</code> time, <code>O(V)</code> queue space. Guarantees the <code>shortest path (fewest edges)</code> on unweighted graphs. Used in crawlers, social-network degrees and 0-1 puzzles.</p>
      <h3>Pseudocode</h3>
      <pre><code>queue = [start]; visited = {start}\nwhile queue:\n  u = queue.popleft()\n  visit(u)\n  for v in neighbours(u):\n    if v not in visited:\n      visited.add(v); queue.append(v)</code></pre>`,
  },
  {
    id: "dfs",
    name: "DFS Traversal",
    icon: "🧭",
    category: "graph",
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V)",
    viz: "graph",
    traversal: "dfs",
    explanation: `
      <h3>What it is</h3>
      <p>Depth-First Search dives <code>as deep as possible</code> down one path before backtracking, using a stack (or recursion). Orange edges below show the dive path.</p>
      <h3>How it works</h3>
      <p>1. From <code>A</code> go to <code>B</code>, then <code>D</code> — dead end, backtrack.<br>2. Back at <code>B</code>, try <code>E</code> — dead end, backtrack to <code>A</code>.<br>3. Then <code>C → F</code>. Order: <code>A → B → D → E → C → F</code>.</p>
      <h3>Complexity</h3>
      <p><code>O(V+E)</code> time, <code>O(V)</code> stack space. The tool for cycle detection, topological sort, connected components and maze solving.</p>
      <h3>Pseudocode</h3>
      <pre><code>def dfs(u):\n  visited.add(u); visit(u)\n  for v in neighbours(u):\n    if v not in visited:\n      dfs(v)   # recursion = implicit stack</code></pre>`,
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    icon: "🗺️",
    category: "graph",
    timeComplexity: "O((V+E) log V)",
    spaceComplexity: "O(V)",
    viz: "dijkstra",
    explanation: `
      <h3>What it is</h3>
      <p>Dijkstra finds the <code>cheapest path</code> from a source through a weighted graph (non-negative weights) by always settling the closest unsettled node next — a greedy wavefront moving at edge-cost speed.</p>
      <h3>How it works</h3>
      <p>1. <code>dist[S] = 0</code>, rest ∞. Pop the unsettled node with smallest dist.<br>2. <b>Relax</b> its edges: if <code>dist[u] + w &lt; dist[v]</code>, update <code>dist[v]</code>.<br>3. Here: settle <code>S(0) → B(2) → A(4) → T(7)</code>. Best route <code>S→A→T = 4+3 = 7</code> beats <code>S→B→T = 8</code>.</p>
      <h3>Complexity</h3>
      <p><code>O((V+E) log V)</code> with a min-heap, <code>O(V)</code> space. Fails on negative weights (use Bellman-Ford). Powers maps, routing and network-latency problems.</p>
      <h3>Pseudocode</h3>
      <pre><code>dist = {all: ∞}; dist[S] = 0; pq = [(0, S)]\nwhile pq:\n  d, u = heappop(pq)\n  if settled(u): continue\n  settle(u)\n  for (v, w) in edges(u):\n    if d + w < dist[v]:\n      dist[v] = d + w; heappush(pq, (dist[v], v))</code></pre>`,
  },
];
