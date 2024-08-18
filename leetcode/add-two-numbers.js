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

var createNode = (val, next) => {
    var obj = {}
    obj.val = (val === undefined ? 0 : val)
    obj.next = (next === undefined ? null : next)
    return obj
}

var buildListNode = (arr, reverse = true) => {
    return reverse ? arr.reduce((acc, v, i) => acc == null ? createNode(v) : createNode(v, acc), null)
        : arr.reduceRight((acc, v, i) => acc == null ? createNode(v) : createNode(v, acc), null)
}

var addTwoNumbers = function (l1, l2) {
    getVal = (listNode) => {
        let strVal = ""
        if (listNode.next != null) {
            strVal += getVal(listNode.next)
        }

        strVal += listNode.val

        return strVal
    }

    let l1Val = BigInt(getVal(l1))
    let l2Val = BigInt(getVal(l2))
    let arrFromSum = (l1Val + l2Val).toString().split("")
    console.log(l1Val)
    console.log(l2Val)
    console.log(arrFromSum)
    console.log(createNode(11))

    let res = buildListNode(arrFromSum)
    console.log(res)
    return res
};

var l1 = buildListNode([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], false)
var l2 = buildListNode([5, 6, 4], false)
addTwoNumbers(l1, l2)

