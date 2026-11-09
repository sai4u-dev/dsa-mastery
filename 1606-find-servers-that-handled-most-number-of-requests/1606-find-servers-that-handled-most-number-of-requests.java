class Solution {
    public List<Integer> busiestServers(int k, int[] arrival, int[] load) {
        TreeSet<Integer> set = new TreeSet<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));

        int[] cnt = new int[k];
        for (int i = 0; i < k; i++)
            set.add(i);
        for (int i = 0; i < arrival.length; i++) {
            while (!pq.isEmpty() && pq.peek()[0] <= arrival[i]) {
                set.add(pq.poll()[1]);
            }
            if (set.isEmpty())
                continue;
            Integer s = set.ceiling(i % k);
            if (s == null)
                s = set.first();
            set.remove(s);
            cnt[s]++;
            pq.offer(new int[] { arrival[i] + load[i], s });
        }
        int max = 0;
        for (int c : cnt)
            max = Math.max(max, c);
        List<Integer> ans = new ArrayList<>();

        for (int i = 0; i < k; i++) {
            if (cnt[i] == max)
                ans.add(i);
        }
        return ans;
    }
}