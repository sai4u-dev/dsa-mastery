import java.util.*;

class Solution {
    public int shortestPath(int n, int[][] edges, String labels, int k) {
        List<int[]>[] g = new ArrayList[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        for (int[] e : edges) g[e[0]].add(new int[]{e[1], e[2]});
        
        int[][] d = new int[n][k + 1];
        for (int[] r : d) Arrays.fill(r, Integer.MAX_VALUE);
        
        PriorityQueue<int[]> q = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        d[0][1] = 0;
        q.offer(new int[]{0, 0, 1});
        
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int w = cur[0], u = cur[1], c = cur[2];
            
            if (u == n - 1) return w;
            if (w > d[u][c]) continue;
            
            for (int[] e : g[u]) {
                int v = e[0], wt = e[1];
                int nc = labels.charAt(v) == labels.charAt(u) ? c + 1 : 1;
                
                if (nc <= k && w + wt < d[v][nc]) {
                    d[v][nc] = w + wt;
                    q.offer(new int[]{w + wt, v, nc});
                }
            }
        }
        
        return -1;
    }
}