class Solution {
    public int[] recoverOrder(int[] order, int[] friends) {
        HashSet<Integer> s = new HashSet<>();
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < friends.length; i++) {
            s.add(friends[i]);
        }
        for (int i = 0; i < order.length; i++) {
            if (s.contains(order[i])) {
                res.add(order[i]);
            }
        }
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}