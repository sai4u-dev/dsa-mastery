
class Solution {
    public boolean isSubsequence(String s, String t) {

        for (int i = 0; i < s.length(); i++) {
            boolean found = false;
            for (int j = 0; j < t.length(); j++) {
                if (s.charAt(i) == t.charAt(j)) {
                    found = true;
                    t = t.substring(j + 1);
                    break;
                }
            }
            if (!found)
                return false;
        }
        return true;
    }
}
