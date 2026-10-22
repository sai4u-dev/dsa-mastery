#include <iostream>
#include <set>
#include <algorithm>
 
using namespace std;
 
typedef pair<int, int> Point;
typedef pair<Point, Point> Segment;
 
// Helper function to normalize a segment so that the smaller point comes first
Segment normalize(Point p1, Point p2) {
    if (p2 < p1) swap(p1, p2);
    return {p1, p2};
}
 
int main() {
    // Optimize standard input/output streams for speed
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
 
    set<Segment> given_segments;
    set<int> x_coords, y_coords;
 
    for (int i = 0; i < 4; ++i) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        
        // Check for degenerate segments (points) or diagonal segments
        if ((x1 == x2 && y1 == y2) || (x1 != x2 && y1 != y2)) {
            cout << "NO
";
            return 0;
        }
        
        x_coords.insert(x1);
        x_coords.insert(x2);
        y_coords.insert(y1);
        y_coords.insert(y2);
        
        given_segments.insert(normalize({x1, y1}, {x2, y2}));
    }
 
    // A valid rectangle must have exactly 2 distinct x-coordinates and 2 distinct y-coordinates
    if (x_coords.size() != 2 || y_coords.size() != 2) {
        cout << "NO
";
        return 0;
    }
 
    int xmin = *x_coords.begin();
    int xmax = *x_coords.rbegin();
    int ymin = *y_coords.begin();
    int ymax = *y_coords.rbegin();
 
    // Define the 4 expected edges of the rectangle
    set<Segment> expected_segments;
    expected_segments.insert(normalize({xmin, ymin}, {xmin, ymax}));
    expected_segments.insert(normalize({xmax, ymin}, {xmax, ymax}));
    expected_segments.insert(normalize({xmin, ymin}, {xmax, ymin}));
    expected_segments.insert(normalize({xmin, ymax}, {xmax, ymax}));
 
    // Check if the given segments match the expected rectangle edges
    if (given_segments == expected_segments) {
        cout << "YES
";
    } else {
        cout << "NO
";
    }
 
    return 0;
}