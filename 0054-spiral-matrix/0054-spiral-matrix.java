class Solution {
    public List<Integer> spiralOrder(int[][] a) {
        List<Integer> res = new ArrayList<>();
        int t = 0, b = a.length - 1, l = 0, r = a[0].length - 1;
        while (t <= b && l <= r) {
            for (int i = l; i <= r; i++)
                res.add(a[t][i]);
            t++;
            for (int i = t; i <= b; i++)
                res.add(a[i][r]);
            r--;
            if (t <= b)
                for (int i = r; i >= l; i--)
                    res.add(a[b][i]);
            b--;
            if (l <= r)
                for (int i = b; i >= t; i--)
                    res.add(a[i][l]);
            l++;
        }
        return res;
    }
}