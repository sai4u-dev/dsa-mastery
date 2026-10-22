#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
 
using namespace std;
 
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
 
    int fruitTypesCount, itemsCount;
    if (!(cin >> fruitTypesCount >> itemsCount)) return 0;
 
    vector<int> prices(fruitTypesCount);
    for (int i = 0; i < fruitTypesCount; ++i) {
        cin >> prices[i];
    }
 
    sort(prices.begin(), prices.end());
 
    map<string, int> frequencyMap;
    for (int i = 0; i < itemsCount; ++i) {
        string fruitName;
        cin >> fruitName;
        frequencyMap[fruitName]++;
    }
 
    vector<int> counts;
    for (auto const& [name, count] : frequencyMap) {
        counts.push_back(count);
    }
    sort(counts.rbegin(), counts.rend());
 
    long long minTotalCost = 0;
    for (int i = 0; i < counts.size(); ++i) {
        minTotalCost += (long long)counts[i] * prices[i];
    }
 
    long long maxTotalCost = 0;
    for (int i = 0; i < counts.size(); ++i) {
        maxTotalCost += (long long)counts[i] * prices[fruitTypesCount - 1 - i];
    }
    cout << minTotalCost << " " << maxTotalCost << "
";
    return 0;
}