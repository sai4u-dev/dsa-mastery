#include <iostream>
#include <vector>
#include <string>
 
using namespace std;
 
int main() {
    // Optimize standard input/output streams for speed
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
 
    vector<string> grid(3);
    for (int i = 0; i < 3; ++i) {
        cin >> grid[i];
    }
 
    bool is_symmetric = true;
 
    // Check central symmetry for all elements in the 3x3 grid
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            if (grid[i][j] != grid[2 - i][2 - j]) {
                is_symmetric = false;
                break;
            }
        }
        if (!is_symmetric) {
            break;
        }
    }
 
    if (is_symmetric) {
        cout << "YES
";
    } else {
        cout << "NO
";
    }
 
    return 0;
}