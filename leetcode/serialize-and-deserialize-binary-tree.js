/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var checkNotNullValue = (val) => val !== "null" && val !== null && val !== undefined

var getNodeValues = (arrNodes = [], arrValue = []) => {
    if (!arrNodes || arrNodes.length == 0) return arrValue

    let nextArrNodes = []

    for (let i = 0; i < arrNodes.length; i++) {
        if (arrNodes[i] && arrNodes[i] !== null) {
            nextArrNodes.push(arrNodes[i] == null ? null : (arrNodes[i]?.left ?? null))
            nextArrNodes.push(arrNodes[i] == null ? null : (arrNodes[i]?.right ?? null))
        }

        arrValue.push(arrNodes[i] == null ? "null" : arrNodes[i]?.val ?? "null")
    }
    return getNodeValues(nextArrNodes, arrValue)
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    let arrNodes = [], arrValue = [], str = "", count = 0

    if (root && checkNotNullValue(root.val)) {
        arrNodes = [root]
        getNodeValues(arrNodes, arrValue)

        // Xử lý các item null dư thừa ở level cuối cùng nếu có
        if (arrValue && arrValue.length > 1) {
            let lastCumulativeNullIndex = 0

            for (let i = arrValue.length - 1; i >= 0; i--) {
                try {
                    if (arrValue[i] && arrValue[i].toString() === "null") {
                        continue
                    }
                    else {
                        lastCumulativeNullIndex = i
                        break
                    }
                }
                catch (err) {
                    console.error('err::', err)
                }
            }

            console.log('lastCumulativeNullIndex:', lastCumulativeNullIndex)
            console.log('last arrValue:', arrValue)
            if (lastCumulativeNullIndex > 0) {
                arrValue = arrValue.slice(0, lastCumulativeNullIndex + 1)
            }
        }
    }

    str = arrValue.join(",")
    console.log('last str::', str)
    return str
};

var TreeNode = (val) => {
    let obj = {}
    obj.val = val;
    obj.left = obj.right = null;

    return obj
}

var createTreeNode = (parentNodes = [], arrNextValues = []) => {
    console.log('time::', new Date().toLocaleString())
    console.log('===========START============')

    if (!arrNextValues || arrNextValues.length == 0) return [[], []]
    if (!parentNodes || parentNodes.length == 0) return [[], []]

    let nextParentNodes = []
    for (let i = 0; i < parentNodes.length; i++) {

        try {
            console.log('parentNodes::', parentNodes)
            console.log('arrNextValues::', arrNextValues)

            if (parentNodes[i] && parentNodes[i] !== undefined && checkNotNullValue(parentNodes[i].val)) {
                // get 2 first value from arrNextValues
                const [leftValue, rightValue] = arrNextValues
                console.log('leftValue, rightValue::', { leftValue, rightValue })
                console.log('parentNodes[i]::', parentNodes[i])

                // create node + left, right

                // if leftValue == undefined means end of arrNextValues
                if (leftValue == undefined) {
                    return [[], []]
                }
                else if (checkNotNullValue(leftValue)) {
                    // create left node for parentNodes[i]
                    parentNodes[i].left = TreeNode(leftValue)

                    // push new node into nextParentNodes list for next call
                    nextParentNodes.push(parentNodes[i].left)
                }

                if (checkNotNullValue(rightValue)) {
                    // create right node for parentNodes[i]
                    parentNodes[i].right = TreeNode(rightValue)

                    // push new node into nextParentNodes list for next call
                    nextParentNodes.push(parentNodes[i].right)
                }

                // remove 2 items
                arrNextValues = arrNextValues.slice(2)
            }
        }
        catch (err) {
            console.error('createTreeNode err::', err)
        }
    }

    console.log('nextParentNodes::', nextParentNodes)
    console.log('===========END============')
    createTreeNode(nextParentNodes, arrNextValues)
    // return [nextParentNodes, arrNextValues]
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    let root = null;
    if (data) {
        let arrData = data.split(",")
        console.log('arrData::', arrData)

        if (arrData.length > 0) {
            let rootVal = arrData[0]
            arrData = arrData.slice(1)

            if (checkNotNullValue(rootVal)) {
                root = TreeNode(rootVal)
                let parentNodes = [root]

                createTreeNode(parentNodes, arrData)
            }
        }
    }

    console.log('root::', root)
    return root
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// "0,0,0,0,null,null,1,null,null,null,2"
// "1,2,3,null,null,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18"
var data = "0,0,0,0,null,null,1,null,null,null,2"

var tree = deserialize(data)
console.log(JSON.stringify(tree))

var serializeToString = serialize(tree)
// deserialize(serialize(tree))
