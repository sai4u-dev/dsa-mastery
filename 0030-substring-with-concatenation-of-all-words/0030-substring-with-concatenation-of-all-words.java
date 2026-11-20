class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> ans = new ArrayList<>();
        Map<String, Integer> map = new HashMap<>();
        int w = words[0].length(), n = words.length;

        for (String x : words)
            map.put(x, map.getOrDefault(x, 0) + 1);

        for (int i = 0; i < w; i++) {
            int l = i, c = 0;
            Map<String, Integer> cur = new HashMap<>();

            for (int r = i; r + w <= s.length(); r += w) {
                String x = s.substring(r, r + w);

                if (!map.containsKey(x)) {
                    cur.clear();
                    c = 0;
                    l = r + w;
                    continue;
                }

                cur.put(x, cur.getOrDefault(x, 0) + 1);
                c++;

                while (cur.get(x) > map.get(x)) {
                    String y = s.substring(l, l + w);
                    cur.put(y, cur.get(y) - 1);
                    c--;
                    l += w;
                }

                if (c == n)
                    ans.add(l);
            }
        }

        return ans;
    }
}