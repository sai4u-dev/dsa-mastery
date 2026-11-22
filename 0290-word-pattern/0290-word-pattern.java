class Solution {
    public boolean wordPattern(String p, String s) {
        String[] w = s.split(" ");
        if (p.length() != w.length)
            return false;

        int[] a = new int[26];
        Map<String, Integer> b = new HashMap<>();

        for (int i = 0; i < w.length; i++) {
            int x = p.charAt(i) - 'a', y = i + 1;
            if (a[x] != b.getOrDefault(w[i], 0))
                return false;
            a[x] = b.put(w[i], y) == null ? y : y;
        }
        return true;
    }
}