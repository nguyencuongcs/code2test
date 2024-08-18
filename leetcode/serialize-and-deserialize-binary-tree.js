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
    let obj = {};
    if (data) {
        let arrData = data.split(",")
        console.log('arrData::', arrData)
        let level = 0, occupiedIndex = 0, countNodeInLevel = 0
        let mapTmp = new Map(), key = ""

        if (arrData.length > 0) {
            let rootVal = arrData[0]
            if (rootVal && rootVal != "null") {
                obj = createTreeNode(v)

                arrData = arrData.slice(0, 1)
            }

            // arrData after pop first element as root value
            if (arrData.length > 0) {
                level++;
                countNodeInLevel = Math.pow(2, level)

                let checkLength = arrData.length > countNodeInLevel ? countNodeInLevel : arrData.length
                let arrVal = arrData.slice(0, checkLength)

                arrData = arrData.slice()
            }
        }

        // let level = 0, occupiedIndex = 0, countNodeInLevel = 0
        // let mapTmp = new Map(), key = ""
        arrData.reduce((acc, v, i, arr) => {
            // occupiedIndex += level == 1 ? 0 : 2
            countNodeInLevel = Math.pow(2, level)
            console.log('level::', level)
            console.log('countNodeInLevel::', countNodeInLevel)
            console.log('v::', v)
            if (v && v != "null") {
                if (i == 0) {
                    key = level
                    mapTmp.set(key) = [v]

                    // acc = createTreeNode(v)
                    // obj = acc
                    // return acc;
                }
                else {
                    if (i % 2 != 0) {
                        key = `${level}.1`
                        acc.left = createTreeNode(v)
                    }
                    else {
                        key = `${level}.2`
                        acc.right = createTreeNode(v)
                    }
                }
            }

            level++;
            console.log('acc::', acc)

        }, {})
    }

    return obj
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

var data = "1,2,3,null,null,4,5"
var tree = deserialize(data)
console.log(tree)