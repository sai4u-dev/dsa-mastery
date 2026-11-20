class Solution {
    public String minWindow(String s, String t) {
        int[] a = new int[128];
        for (char c : t.toCharArray())
            a[c]++;

        int l = 0, k = t.length(), m = Integer.MAX_VALUE, st = 0;

        for (int r = 0; r < s.length(); r++) {
            if (a[s.charAt(r)]-- > 0)
                k--;

            while (k == 0) {
                if (r - l + 1 < m) {
                    m = r - l + 1;
                    st = l;
                }
                if (++a[s.charAt(l++)] > 0)
                    k++;
            }
        }

        return m == Integer.MAX_VALUE ? "" : s.substring(st, st + m);
    }
}