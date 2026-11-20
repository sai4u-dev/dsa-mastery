class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int t = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = t;
            }

        for (int[] r : matrix)
            for (int l = 0, h = n - 1; l < h; l++, h--) {
                int t = r[l];
                r[l] = r[h];
                r[h] = t;
            }
    }
}