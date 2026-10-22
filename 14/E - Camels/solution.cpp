#include <iostream>
#include <cstring>
 
using namespace std;
 
// Memoization tables
long long memo[21][5][3][11][10];
bool visited[21][5][3][11][10];
 
long long solve(int i, int v, int dir, int c_max, int c_min, int n, int t) {
    // Base case: when we have chosen all n elements
    if (i == n) {
        return (c_max == t && c_min == t - 1) ? 1 : 0;
    }
    
    // Pruning invalid states early
    if (c_max > t || c_min > t - 1) return 0;
    
    if (visited[i][v][dir][c_max][c_min]) {
        return memo[i][v][dir][c_max][c_min];
    }
    
    long long total = 0;
    for (int nv = 1; nv <= 4; ++nv) {
        // No segment should be parallel to the Ox-axis (y_i != y_{i+1})
        if (nv == v) continue;
        
        int d_next = (nv > v) ? 1 : 2;
        int nc_max = c_max;
        int nc_min = c_min;
        
        // Check if index i is a local extremum (valid for 2 <= i <= n - 1)
        if (i >= 2 && i <= n - 1) {
            if (dir == 1 && d_next == 2) {
                nc_max++;
            } else if (dir == 2 && d_next == 1) {
                nc_min++;
            }
        }
        
        total += solve(i + 1, nv, d_next, nc_max, nc_min, n, t);
    }
    
    visited[i][v][dir][c_max][c_min] = true;
    return memo[i][v][dir][c_max][c_min] = total;
}
 
int main() {
    // Optimize standard I/O operations
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, t;
    if (!(cin >> n >> t)) return 0;
    
    memset(visited, 0, sizeof(visited));
    
    long long ans = 0;
    // Try all possible starting values for y_1
    for (int v = 1; v <= 4; ++v) {
        ans += solve(1, v, 0, 0, 0, n, t);
    }
    
    cout << ans << "
";
    
    return 0;
}