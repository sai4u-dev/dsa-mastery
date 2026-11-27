class Solution {
    public int numJewelsInStones(String jewels, String stones) {
        HashMap<Character, Integer> hm = new HashMap<>();
        for(int i=0; i<stones.length(); i++){
            hm.put(stones.charAt(i), hm.getOrDefault(stones.charAt(i),0)+1);
        }
        int ans=0;
        for(int i=0; i< jewels.length(); i++){
            if(hm.containsKey(jewels.charAt(i))){
                ans+=hm.get(jewels.charAt(i));
            }
        }
        return ans;
    }
}