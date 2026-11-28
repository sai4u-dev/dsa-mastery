class Solution {
    public int maximumSaleItems(int[][] items, int budget) {
        int n = items.length;
        int[] freq = new int[n + 1];
        long min = Long.MAX_VALUE;

        for (int[] item : items) {
            freq[item[0]]++;
            min = Math.min(min, item[1]);
        }

        int[] cnt = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = i; j <= n; j += i) {
                cnt[i] += freq[j];
            }
        }

        int[][] sorted = items.clone();

        Arrays.sort(sorted, Comparator.comparingInt(a -> a[1]));

        long left = budget;
        long ans = 0;

        for (int[] item : sorted) {

            long price = item[1];
            long gain = cnt[item[0]] - 1L;

            if (price >= 2 * min || left < price) {
                break;
            }

            long copies = Math.min(gain, left / price);

            ans += copies * 2;
            left -= copies * price;
        }

        ans += left / min;

        return (int) ans;
    }
}