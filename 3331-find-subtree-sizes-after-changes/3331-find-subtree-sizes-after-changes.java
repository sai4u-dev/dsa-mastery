class Solution {
    List<Integer>[] tree;
    int[] nearest, ans, newParent;
    char[] s;

    public int[] findSubtreeSizes(int[] parent, String str) {
        int n = parent.length;
        s = str.toCharArray();
        nearest = new int[26];
        ans = new int[n];
        newParent = parent.clone();
        tree = new ArrayList[n];

        Arrays.fill(nearest, -1);

        for (int i = 0; i < n; i++)
            tree[i] = new ArrayList<>();

        for (int i = 1; i < n; i++)
            tree[parent[i]].add(i);

        dfs(0);

        Arrays.fill(tree, null);
        for (int i = 0; i < n; i++)
            tree[i] = new ArrayList<>();

        for (int i = 1; i < n; i++)
            tree[newParent[i]].add(i);

        calc(0);
        return ans;
    }

    void dfs(int u) {
        int c = s[u] - 'a';
        int prev = nearest[c];
        nearest[c] = u;

        for (int v : tree[u]) {
            int k = s[v] - 'a';
            if (nearest[k] != -1)
                newParent[v] = nearest[k];
            dfs(v);
        }

        nearest[c] = prev;
    }

    int calc(int u) {
        int size = 1;
        for (int v : tree[u])
            size += calc(v);
        return ans[u] = size;
    }
}