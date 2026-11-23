class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> m = new HashMap<>();

        for (String s : strs) {
            char[] c = s.toCharArray();
            Arrays.sort(c);
            m.computeIfAbsent(new String(c), k -> new ArrayList<>()).add(s);
        }

        return new ArrayList<>(m.values());
    }
}