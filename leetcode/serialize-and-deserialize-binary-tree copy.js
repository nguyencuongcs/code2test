/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

var TreeNode = (val) => {
    let obj = {}
    obj.val = val;
    obj.left = obj.right = null;

    return obj
}

var checkNotNullValue = (val) => !!val && val !== "null" && val !== undefined

/**
 * 
 * @param {*} parentNodes: first call need to inject root node
 * @param {*} arrNextValues 
 * @returns 
 */
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
    return [nextParentNodes, arrNextValues]
}

getNodeValues = (arrNodes = [], arrValue = []) => {
    console.log('========= START ==========')

    console.log('arrNodes::', arrNodes)
    console.log('arrValue::', arrValue)

    if (!arrNodes || arrNodes.length == 0) return arrValue

    let nextArrNodes = []

    for (let i = 0; i < arrNodes.length; i++) {
        if (arrNodes[i] && arrNodes[i] !== null) {
            nextArrNodes.push(arrNodes[i] == null ? null : (arrNodes[i]?.left ?? null))
            nextArrNodes.push(arrNodes[i] == null ? null : (arrNodes[i]?.right ?? null))
        }

        arrValue.push(arrNodes[i] == null ? "null" : arrNodes[i]?.val ?? "null")
    }

    console.log('nextArrNodes::', nextArrNodes)
    console.log('arrValue 2::', arrValue)
    console.log('========= END ==========')
    return [nextArrNodes, arrValue]
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    let arrNodes = [], arrValue = [], str = ""

    if (root && checkNotNullValue(root.val)) {
        arrNodes = [root]
        let count = 0;
        let isRunning = true
        while (arrNodes && arrNodes.length > 0 && count < 20) {
            try {
                console.log(`StartTime_${count}: `, new Date().toLocaleString())
                count++

                [arrNodes, arrValue] = getNodeValues(arrNodes, arrValue)
            }
            catch (err) {
                console.error('serialize err::', err)
                isRunning = false
                return;
            }
        }

        // Xử lý các item null dư thừa ở level cuối cùng nếu có
        if (arrValue && arrValue.length > 1) {
            let lastCumulativeNullIndex = 0

            for (let i = arrValue.length - 1; i >= 0; i--) {
                try {
                    console.log(`arrValue[${i}]::`, arrValue[i])
                    console.log('check::', arrValue[i] && arrValue[i].toString() === "null")
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
            if (lastCumulativeNullIndex > 0) {
                arrValue = arrValue.slice(0, lastCumulativeNullIndex + 1)
            }
        }

        console.log('last arrValue:: ', arrValue)
    }

    str = arrValue.join(",")
    console.log('last str::', str)
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
    let root = {};
    if (data) {
        let arrData = data.split(",")
        console.log('arrData::', arrData)

        if (arrData.length > 0) {
            let rootVal = arrData[0]
            arrData = arrData.slice(1)

            if (checkNotNullValue(rootVal)) {
                root = TreeNode(rootVal)
                let parentNodes = [root]

                while (arrData.length > 0) {
                    console.log('rootTree::::', root)
                    // [parentNodes, arrData] = createTreeNode(parentNodes, arrData)

                    try {
                        [parentNodes, arrData] = createTreeNode(parentNodes, arrData)
                    }
                    catch (err) {
                        console.error('err::', err)
                        // break while
                        arrData = []
                    }
                }
            }
        }
    }

    return root
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

var data = "1,2,3,null,null,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18"
var tree = deserialize(data)
// var serializeToString = serialize(tree)

console.log(JSON.stringify(tree))