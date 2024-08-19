/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

var createTreeNode = (val, left, right) => {
    var obj = {}
    obj.val = val
    obj.left = left ?? null
    obj.right = right ?? null
    return obj
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
    console.log(arr4.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    var str = ""
    if (!root.val) return str

    str += root.val

    if (root.left == null && root.right == null)
        return str
    else {
        if (root.left == null) str += "null,null"
        else {
            str += ""
        }

        if (root.right == null) str += "null,null"
        else {

        }
    }

    return str
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 * 
 * 1,2,3,null,null,4,5
 * 
 */
var deserialize = function (data) {
    let objTree = {};
    let refCurrentTreeNode = null
    if (data) {
        let arrData = data.split(",")
        console.log('arrData::', arrData)
        let level = 0, countNodeInLevel = 0, countNullValues = 0, parentArrVal
        let mapTmp = new Map(), key = ""

        if (arrData.length > 0) {
            let rootVal = arrData[0]
            objTree = createTreeNode(rootVal)

            // check false && != "null" string
            if (rootVal && rootVal != "null") {
                // add root key->value into mapTmp
                key = "0" // root
                mapTmp.set(key, [rootVal])

                // arrData after pop first element as root value
                arrData = arrData.slice(1) // remove idx 0 as using for root val

                while (arrData.length > 0) {
                    level++;
                    // level 0 (root): node = 2^0 = 1 node
                    // level 1: node = 2^1 = 2
                    // level 2: node = 2^2 = 4
                    // level 3: node = 2^3 = 8
                    countNodeInLevel = Math.pow(2, level) - countNullValues * 2

                    let checkLength = arrData.length > countNodeInLevel ? countNodeInLevel : arrData.length
                    let arrVal = arrData.slice(0, checkLength)

                    console.log('level::', level)
                    console.log('checkLength::', checkLength)
                    console.log('arrVal::', arrVal)

                    key = `${level}.${checkLength}`
                    let nodeValues = arrVal
                    mapTmp.set(key, arrVal)

                    // TH dac biet, do parent là root nên hard code
                    if (level == 1) {
                        if (arrVal[0] && arrVal[0] != "null") {
                            objTree.left = createTreeNode(arrVal[0])
                            // set pointer
                            refCurrentTreeNode = objTree.left

                        }

                        if (arrVal[1] && arrVal[1] != "null") {
                            objTree.right = createTreeNode(arrVal[1])

                            // if pointer still null
                            if (refCurrentTreeNode == null) {
                                refCurrentTreeNode = objTree.right
                            }
                        }
                    } else {
                        let parentIndex = 0
                        let countNode = 0, hasLeft = false, hasRight = false
                        console.log('parentArrVal::', parentArrVal)
                        for (let i = 0; i < arrVal.length; i++) {
                            countNode++
                            if (parentArrVal[parentIndex] && parentArrVal[parentIndex] != "null") {
                                if (i % 2 == 0 && arrVal[i] && arrVal[i] != "null") {
                                    refCurrentTreeNode.left = createTreeNode(arrVal[i])
                                    hasLeft = true
                                }
                                else if (arrVal[i] && arrVal[i] != "null") {
                                    refCurrentTreeNode.right = createTreeNode(arrVal[i])
                                    hasRight = true
                                }

                                if (hasLeft) refCurrentTreeNode = refCurrentTreeNode.left ?? refCurrentTreeNode
                                else if (hasRight) refCurrentTreeNode = refCurrentTreeNode.right ?? refCurrentTreeNode
                                console.log('objTree::', objTree)

                                // reset
                                if (countNode == 2) {
                                    countNode = 0
                                    parentIndex++
                                    hasLeft = false
                                    hasRight = false
                                }
                            }
                        }
                    }

                    // count null values for next round, use to determine exactly how many node has in next level (if parent node is null, subtract 2 items)
                    countNullValues = arrVal.filter((word) => !word || word == "null").length;
                    parentArrVal = [...arrVal]

                    // // loop for items of 1 level
                    // for (let i = 0; i < checkLength; i++) {
                    //     // Moi lan lay 1 cap nen bo qua lan so lẻ tiếp theo
                    //     if (i % 2 == 0) {

                    //         key = `${level}.${i}`
                    //         next = i + 1

                    //         console.log('arrVal[i]::', arrVal[i])
                    //         console.log('arrVal[next]::', arrVal[next])

                    //         refCurrentTreeNode.left = createTreeNode(arrVal[i])
                    //         refCurrentTreeNode.right = createTreeNode(arrVal[next])

                    //         mapTmp.set(key, [arrVal[i] ?? null, arrVal[next] ?? null])
                    //     }
                    // }

                    // cat bo doan arrVal da trich xuat
                    arrData = arrData.slice(checkLength)
                }

            }

            console.log('mapTmp::', mapTmp)
        }
    }

    return objTree
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

var data = "1,2,3,null,null,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18"
var tree = deserialize(data)
console.log(JSON.stringify(tree))