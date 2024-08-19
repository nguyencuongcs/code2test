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

buildNodes = (arrParents, arrData, pointer, parentPointer) => {
    let newArrParents = [];
    let pointerCurrentTreeNode, arrDataLength, hasLeft = false, hasRight = false;
    let countDataTake = 0

    for (let i = 0; i < arrParents.length; i++) {
        console.log('i::', i)

        if (arrParents[i] && arrParents[i] != "null") {
            if (i == 0) {
                pointerCurrentTreeNode = pointer
            }

            let leftIdx = (i * 2) + 0
            let rightIdx = (i * 2) + 1
            newArrParents.push(arrData[0])
            if (arrData[0] && arrData[0] != "null") {
                console.log('arrData[0]::', arrData[0])
                pointerCurrentTreeNode.left = createTreeNode(arrData[0])
                hasLeft = true
            }

            // foreach not null parent node, take 2 value
            newArrParents.push(arrData[1])
            if (arrData[1] && arrData[1] != "null") {
                console.log('arrData[1]::', arrData[1])
                pointerCurrentTreeNode.right = createTreeNode(arrData[1])
                hasRight = true
            }

            if (hasLeft) {
                if (i == 0) {
                    pointerFirstNodeOfParentLevel = pointerCurrentTreeNode.left
                }

                pointerCurrentTreeNode = pointerCurrentTreeNode.left
            }
            else if (hasRight) {
                if (i == 0) {
                    pointerFirstNodeOfParentLevel = pointerCurrentTreeNode.right
                }

                pointerCurrentTreeNode = pointerCurrentTreeNode.right
            }

            // calculate new arrData
            arrDataLength = arrData.length
            // slice(1) = remove index 0 & 1
            arrData = arrDataLength > 2 ? arrData.slice(2) : []

            // reset foreach time create 2 child nodes
            hasRight = false, hasLeft = false

            // reset foreach time finish loop all parent nodes
            if (i == arrParents.length - 1) {
                pointer = pointerFirstNodeOfParentLevel
                // parentArrValues = [...newParentArrValues]
                // newParentArrValues = []

                console.log('newArrParents::', newArrParents)
                console.log('arrData::', arrData)
                console.log('pointer::', pointer)

                return [newArrParents, arrData, pointer]
            }
        }
    }
}

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
    let pointerCurrentTreeNode = null, pointerFirstNodeOfParentLevel
    if (data) {
        let arrData = data.split(",")
        let level = 0, parentArrValues = [], rootVal

        // if arrData is falsy or 0 item, return
        if (!arrData || arrData.length == 0) {
            return null
        }
        else {
            rootVal = arrData[0]
            // if root value is null, return
            if (!rootVal || rootVal == "null") {
                return null
            }
        }

        objTree = createTreeNode(rootVal)
        pointerFirstNodeOfParentLevel = objTree

        parentArrValues.push(rootVal)

        let arrDataLength = arrData.length
        // slice(1) = remove index 0 & 1
        arrData = arrDataLength > 2 ? arrData.slice(1) : []

        // console.log('arrDataLength 1 ::', arrDataLength)
        // console.log('arrData 1 ::', arrData)

        console.log(`=====init====`)
        console.log('parentArrValues::', parentArrValues)
        console.log('arrData::', arrData)
        console.log('pointerFirstNodeOfParentLevel::', pointerFirstNodeOfParentLevel)
        console.log(`=====End init====`)
        let parentPointer = pointerFirstNodeOfParentLevel

        while (arrData.length > 0) {
            [parentArrValues, arrData, pointerFirstNodeOfParentLevel, parentPointer] = buildNodes(parentArrValues, arrData, pointerFirstNodeOfParentLevel, parentPointer)
        }
    }

    return objTree
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

var data = "1,2,3,null,null,4,5,6,7,8,9,10,11,12,13"
var tree = deserialize(data)
console.log(tree)
console.log(JSON.stringify(tree))