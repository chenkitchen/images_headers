//题目描述：给出一个区间的集合，请合并所有重叠的区间。
const merge = function (intervals) {
    // 定义结果数组
    const res = []
    // 缓存区间个数
    const len = intervals.length
    // 将所有区间按照第一个元素大小排序
    intervals.sort(function (a, b) {
        return a[0] - b[0]
    })
    //这样数组中的区间有序，前一个不和下一个相交，也不会和后序的区间相交
    // 处理区间的边界情况
    if (!intervals || !intervals.length) {
        return []
    }
    // 将第一个区间（起始元素最小的区间）推入结果数组（初始化）
    res.push(intervals[0])
    // 按照顺序，逐个遍历所有区间
    for (let i = 1; i < len; i++) {
        // 取结果数组中的最后一个元素，作为当前对比的参考
        prev = res[res.length - 1]
        // 若满足交错关系（前一个的尾部 >= 下一个的头部）
        if (prev[1] >= intervals[i][0]) {
            prev[1] = Math.max(prev[1], intervals[i][1])
        } else {
            res.push(intervals[i])
        }
    }
    return res
}

//题目描述： 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
const lowestCommonAncestor = function (root, p, q) {
    // 编写 dfs 逻辑
    function dfs(root) {
        // 若当前结点不存在（意味着无效）或者等于p/q（意味着找到目标），则直接返回
        if (!root || root.val === p || root.val === q) {
            return root
        }
        // 向左子树去寻找p和q
        const leftNode = dfs(root.left)
        // 向右子树去寻找p和q
        const rightNode = dfs(root.right)
        // 如果左子树和右子树同时包含了p和q，那么这个结点一定是最近公共祖先
        if (leftNode && rightNode) {
            return root
        }
        // 如果左子树和右子树其中一个包含了p或者q，则把对应的有效子树汇报上去，等待进一步的判断；否则返回空
        return leftNode || rightNode
    }

    // 调用 dfs 方法 
    return dfs(root)
};


//滚动数组




// 水槽问题
const waterSink = function (arr) {
    let waterP = [], start = 0, end = 0, len = arr.length;
    while (start < len) {

        let sink = []
        sink.push(start)
        end++
        while (arr[end] < arr[start] && end < len) {
            end++
        }
        if (end >= len) {
            start++
            end = start
        } else {
            sink.push(end)
            start = end
            waterP.push(sink)
        }

    }
    return waterP
}
//上式有问题

const trap = function (height) {
    // 初始化左指针
    let leftCur = 0
    // 初始化右指针
    let rightCur = height.length - 1
    // 初始化最终结果
    let res = 0
    // 初始化左侧最高的柱子
    let leftMax = 0
    // 初始化右侧最高的柱子
    let rightMax = 0

    // 对撞指针开始走路
    while (leftCur < rightCur) {
        // 缓存左指针所指的柱子的高度
        const left = height[leftCur]
        // 缓存右指针所指的柱子的高度
        const right = height[rightCur]
        // 以左右两边较矮的柱子为准，选定计算目标
        if (left < right) {
            // 更新leftMax
            leftMax = Math.max(left, leftMax)
            // 累加蓄水量
            res += leftMax - left
            // 移动左指针
            leftCur++
        } else {
            // 更新rightMax
            rightMax = Math.max(right, rightMax)
            // 累加蓄水量
            res += rightMax - right
            // 移动右指针
            rightCur--
        }
    }
    // 返回计算结果
    return res
};


//柱状图中的最大矩形
const largestRectangleArea = function (heights) {
    // 判断边界条件
    if (!heights || !heights.length) return 0
    // 初始化最大值
    let max = -1
    // 缓存柱子长度
    const len = heights.length
    // 遍历每根柱子
    for (let i = 0; i < len; i++) {
        // 如果遍历完了所有柱子，或者遇到了比前一个矮的柱子，则停止遍历，开始回头计算
        if (i == len - 1 || heights[i] > heights[i + 1]) {
            // 初始化前i个柱子中最矮的柱子
            let minHeight = heights[i]
            // “回头看”
            for (let j = i; j >= 0; j--) {
                // 若遇到比当前柱子更矮的柱子，则以更矮的柱子为高进行计算
                minHeight = Math.min(minHeight, heights[j])
                //  计算当前柱子对应的最大宽度的矩形面积，并及时更新最大值
                max = Math.max(max, minHeight * (i - j + 1))
            }
        }
    }
    // 返回结果
    return max
};


// 背包问题

function knapsack0(weights, values, W) {
    var n = weights.length - 1
    var f = [[]]
    for (var j = 0; j <= W; j++) {
        if (j < weights[0]) { //如果容量不能放下物品0的重量，那么价值为0
            f[0][j] = 0
        } else { //否则等于物体0的价值
            f[0][j] = values[0]
        }
    }
    for (var j = 0; j <= W; j++) {
        for (var i = 1; i <= n; i++) {
            if (!f[i]) { //创建新一行
                f[i] = []
            }
            if (j < weights[i]) { //等于之前的最优值
                f[i][j] = f[i - 1][j]
            } else {
                f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i])
            }
        }
    }
    return f[n][W]
}
//合并循环
function knapsack1(weights, values, W) {
    var n = weights.length - 1
    var f = [[]]
    f[-1] = new Array(W + 1).fill(0)
    for (var j = 0; j <= W; j++) {
        for (var i = 0; i <= n; i++) {
            if (!f[i]) { //创建新一行
                f[i] = []
            }
            if (j < weights[i]) { //等于之前的最优值
                f[i][j] = f[i - 1][j]
            } else {
                f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i])
            }
        }
    }
    return f[n][W]
}
//空间优化
function knapsack2(weights, values, W) {
    var n = weights.length - 1
    var f = []
    f[0] = new Array(W + 1).fill(0)
    f[1] = []
    for (var j = 0; j <= n; j++) {

        for (var i = 0; i <= W; i++) {
            if (i < weights[j]) { //等于之前的最优值
                f[1][i] = f[0][i]
            } else {
                f[1][i] = Math.max(f[0][i], f[0][i - weights[j]] + values[j])
            }
        }
        f[0] = f[1]
        f[1] = []
    }
    return f[0][W]
}

//空间再次优化，使用一维数组
function knapsack(weights, values, W) {
    let n = weights.length - 1,
        f = new Array(W + 1).fill(0)
    for (var j = 0; j <= n; j++) {

        for (var i = W; i >= weights[j]; i--) {
            f[i] = Math.max(f[i - 1], f[i - weights[j]] + values[j])
        }
    }
    return f
}

var a = knapsack([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10)
console.log(a)

// let arr = [[1, 3], [2, 6], [8, 10], [15, 18]]
let tree = {
    val: 3,
    left: {
        val: 5,
        left: {
            val: 6
        },
        right: {
            val: 2,
            left: {
                val: 7
            },
            right: {
                val: 4
            }
        }
    },
    right: {
        val: 1,
        left: {
            val: 0
        },
        right: {
            val: 8
        }
    }
}
// let res = merge(arr)
// let res = lowestCommonAncestor(tree, 5, 4)
// let res = trap([2, 0, 3, 1, 1, 1, 2])
let res = largestRectangleArea([2, 1, 5, 6, 2, 3])
// console.log(res);

