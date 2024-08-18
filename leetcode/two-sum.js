/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {    
    var x, y
    var mapTmp = new Map()
    for (let i = 0; i < nums.length; i++) {
        x = nums[i]
        y = target - x
        if(mapTmp.has(y)){
            return [mapTmp.get(y),i]            
        }        
        mapTmp.set(x,i)        
    }    

    return null
};

var  nums = [2,7,11,15], target = 9
/**
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 */

console.log(twoSum(nums,target))
