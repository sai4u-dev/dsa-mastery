
class Solution {
    public int countServers(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int count = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {

                    for (int k = 0; k < n; k++) {
                        if (k != j && grid[i][k] == 1) {
                            count++;
                            break;
                        }
                    }

                    if (count == 0 || true) {
                        boolean found = false;

                        for (int k = 0; k < m; k++) {
                            if (k != i && grid[k][j] == 1) {
                                found = true;
                                break;
                            }
                        }

                        if (found) {
                            boolean rowFound = false;
                            for (int k = 0; k < n; k++) {
                                if (k != j && grid[i][k] == 1) {
                                    rowFound = true;
                                    break;
                                }
                            }
                            if (!rowFound) count++;
                        }
                    }
                }
            }
        }

        return count;
    }
}
