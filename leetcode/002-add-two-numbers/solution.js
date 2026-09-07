/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let carry = 0;
    let dummyHead = new ListNode(0);  // Dummy node to simplify edge cases
    let current = dummyHead;  // Pointer to build the result list

    // Traverse both lists as long as there is a node in either l1 or l2
    while (l1 !== null || l2 !== null || carry !== 0) {
        // Get the values from the nodes or 0 if the list has ended
        let x = (l1 !== null) ? l1.val : 0;
        let y = (l2 !== null) ? l2.val : 0;

        // Calculate sum and update carry
        let sum = x + y + carry;
        carry = Math.floor(sum / 10);  // Carry for the next iteration
        current.next = new ListNode(sum % 10);  // Create a new node with the current digit

        // Move the current pointer to the next node
        current = current.next;

        // Move to the next node in l1 and l2 if possible
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummyHead.next;  // Return the next of dummyHead, as it is the actual result list

};