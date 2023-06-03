
var waoooooooo = {
  identity: e => e,
  /**
   * chunk
   * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
   * 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
   * @param {array} ary array (Array): 需要处理的数组
   * @param {number} size  [size=1] (number): 每个数组区块的长度
   * @return {array}  (Array): 返回一个包含拆分区块的新数组（注：相当于一个二维数组）。
   */
  chunk: function (ary, size) {
    var result = [[]]
    var count = 0
    var j = 0
    for (let index = 0; index < ary.length; index++) {
      count++
      result[j].push(ary[index])
      if (count == size && index != ary.length - 1) {
        count = 0
        j++
        result[j] = []
      }
    }
    return result
  },

  /**
    * compact
    * 创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "",
    * undefined, 和 NaN 都是被认为是“假值”。
    * @param {Array} array : 待处理的数组
    * @return{Array}: 返回过滤掉假值的新数组。
    */
  compact: array => array.filter(i => i),
  /**
   * concat
   * 创建一个新数组，将array与任何数组 或 值连接在一起。
   * @param {Array} array  被连接的数组。
   * @param  {...any} args 连接的值
   * @return   {Array}  新数组
   */
  concat: (array, ...args) => array.concat(...args),

  /**
   * fill
   * 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
   * @param {Array} array 要填充改变的数组。
   * @param {*} value 填充给 array 的值。
   * @param {Number} start 开始位置（默认0）。
   * @param {Number} end 结束位置（默认array.length）
   * @return {Array} array  返回传入的数组
   */
  fill: (array, value, start = 0, end = array.length) => {
    if (start >= array.length || start > end || end > array.length || !Array.isArray(array)) {
      throw new Error("输入错误")
    }
    for (let index = start; index < end; index++) {
      array[index] = value
    }
    return array
  },

  /**
   * drop
   * @param {Array} array 要查询的数组。
   * @param {Number} n  要去除的元素个数。
   * @return {Array} 返回array剩余切片。(新数组)
   */
  drop: (array, n = 1) => array.filter((e, i) => i >= n),
  dropRight: (array, n = 1) => array.filter((e, i) => i < array.length - n),
  //去除array中从 predicate 返回假值开始到尾部的部分
  dropRightWhile: (array, predicate = waoooooooo.identity) =>array.slice (0,  waoooooooo.findIndexForDrop(array,predicate)),
  //去除array中从起点开始到 predicate 返回假值结束部分
  dropWhile :(array, predicate = waoooooooo.identity) =>array.slice (waoooooooo.findLastIndexForDrop(array,predicate)+1) ,

  findIndexForDrop:(array, predicate = waoooooooo.identity, fromIndex = 0) => {
    if (typeof predicate == "function") {
      for (let index = fromIndex; index < array.length; index++) {
        if (predicate(array[index])) {
          return index
        }
      }
    } else {
      //如果predicate不是函数
      for (let index = fromIndex; index < array.length; index++) {
         if (typeof array[index] == "object") {
          var obj = array[index]
          //如果是对象,分三种情况
          //1.predicate是数组(键值对)
          if (Array.isArray(predicate) && predicate.length == 2) {
            for (const key in obj) {
              if (key == predicate[0] && obj[key] == predicate[1]) {
                return index
              }
            }
          } else if (typeof predicate == "object") {
            //2.predicate是对象
            if (waoooooooo.objectEqual(predicate, obj)) {
              return index
            }
          } else {
            //3.predicate是key字符串
              if (!(predicate in obj)) {
                return index
              }
          }
        }
      }
    }
    return Infinity
  },
  findLastIndexForDrop:(array, predicate = waoooooooo.identity, fromIndex = 0) => {
    if (typeof predicate == "function") {
      for (let index = array.length-1; index >= fromIndex; index--) {
        if (predicate(array[index])) {
          return index
        }
      }
    } else {
      //如果predicate不是函数
      for (let index = array.length-1; index >= fromIndex; index--) {
         if (typeof array[index] == "object") {
          var obj = array[index]
          //如果是对象,分三种情况
          //1.predicate是数组(键值对)
          if (Array.isArray(predicate) && predicate.length == 2) {
            for (const key in obj) {
              if (key == predicate[0] && obj[key] == predicate[1]) {
                return index
              }
            }
          } else if (typeof predicate == "object") {
            //2.predicate是对象
            if (waoooooooo.objectEqual(predicate, obj)) {
              return index
            }
          } else {
            //3.predicate是key字符串
              if (!(predicate in obj)) {
                return index
              }
          }
        }
      }
    }
    return -1
  },
  /**
   * findIndex
   * @param {*} array
   * @param {*} predicate
   * @param {*} fromIndex
   * @returns
   */
  findIndex: (array, predicate = waoooooooo.identity, fromIndex = 0) => {
    if (typeof predicate == "function") {
      for (let index = fromIndex; index < array.length; index++) {
        if (predicate(array[index])) {
          return index
        }
      }
    } else {
      //如果predicate不是函数
      for (let index = fromIndex; index < array.length; index++) {
        if (array[index] === predicate) {
          return index
        } else if (typeof array[index] == "object") {
          var obj = array[index]
          //如果是对象,分三种情况
          //1.predicate是数组(键值对)
          if (Array.isArray(predicate) && predicate.length == 2) {
            for (const key in obj) {
              if (key == predicate[0] && obj[key] == predicate[1]) {
                return index
              }
            }
          } else if (typeof predicate == "object") {
            //2.predicate是对象
            if (waoooooooo.objectEqual(predicate, obj)) {
              return index
            }
          } else {
            //3.predicate是key
            for (const key in obj) {
              if (key == predicate && obj[key]) {
                return index
              }
            }
          }
        }
      }
    }
    return -1
  },

  /**
   *
   * @param {*} array
   * @param {*} predicate
   * @param {*} fromIndex
   * @returns 返回查找的值在数组中的坐标
   */
  findLastIndex: (array, predicate = waoooooooo.identity, fromIndex = array.length - 1) => {
    if (typeof predicate == "function") {
      for (let index = fromIndex; index >= 0; index--) {
        if (predicate(array[index])) {
          return index
        }
      }
    } else {
      //如果predicate不是函数
      for (let index = fromIndex; index >= 0; index--) {
        if (array[index] === predicate) {
          return index
        } else if (typeof array[index] == "object") {
          var obj = array[index]
          //如果是对象,分三种情况
          //1.predicate是数组(键值对)
          if (Array.isArray(predicate) && predicate.length == 2) {
            for (const key in obj) {
              if (key == predicate[0] && obj[key] == predicate[1]) {
                return index
              }
            }
          } else if (typeof predicate == "object") {
            //2.predicate是对象
            if (waoooooooo.objectEqual(predicate, obj)) {
              return index
            }
          } else {
            //3.predicate是key
            for (const key in obj) {
              if (key == predicate && obj[key]) {
                return index
              }
            }
          }
        }
      }
    }
    return -1
  },

  /**
   * 判断两个对象是否相等
   * @param {*} obj1
   * @param {*} obj2
   * @returns
   */
  objectEqual: (obj1, obj2) => {
    var flag = true
    try {
      for (const key in obj1) {
        if (!(key in obj2 && obj1[key] == obj2[key])) {
          flag = false
          break;
        }
      }
      for (const key in obj2) {
        if (!(key in obj1 && obj1[key] == obj2[key])) {
          flag = false
        }
      }
    } catch (error) {
      return false
    }

    return flag
  },

  /**
   * flatten
   * @param {*} array
   * @returns Array 返回拍平一次的新数组
   */
  flatten: array => array.reduce((arr, e) => { Array.isArray(e) ? arr.push(...e) : arr.push(e); return arr }, []),

  /**
   * flattenDeep
   * @param {*} array
   * @returns Array 返回拍平的新数组
   */
  flattenDeep: function flattenDeep(array) {
    return array.reduce((arr, e) => {
      if (Array.isArray(e)) {
        arr.push(...waoooooooo.flattenDeep(e))
      } else {
        arr.push(e)
      }
      return arr
    }, [])
  },

  /**
   * 根据 depth 递归减少 array 的嵌套层级
   * @param {*} array
   * @param {*} depth 展开深度
   * @returns
   */
  flattenDepth: (array, depth = 1) => {
    for (let index = 0; index < depth; index++) {
      var array = waoooooooo.flatten(array)
    }
    return array
  },

  /**
   * difference
   * @param {*} array
   * @param {*} values
   * @returns 除了values的 去重的  新的数组
   */
  difference: (array, ...values) => {
    var flatValues = waoooooooo.flattenDeep(values)
    var arr = array.filter((e) => !(flatValues.indexOf(e) + 1)) //0为false 所以加1
    //去重
    var set = new Set()
    var result = []
    for (let index = 0; index < arr.length; index++) {
      var e = arr[index]
      if (set.has(e)) {
        continue
      } else {
        set.add(e)
        result.push(e)
      }
    }
    return result
  },

  differenceBy: (array, ...args) => {
    //1.如果参数的最后一个为函数

    if (typeof args.at(-1) == "function") {
      var fun = args.at(-1)
      args.pop()
      var arguments = waoooooooo.flattenDeep(args)
      for (let index = 0; index < arguments.length; index++) {
        arguments[index] = fun(arguments[index]);
      }
      var result = array.filter((e) => !(arguments.indexOf(fun(e)) + 1))
    }
    else if (typeof args.at(-1) == "string") {
      var str = args.at(-1)
      args.pop()
      var arguments = waoooooooo.flattenDeep(args)
      var result = array.filter(e => !arguments.find((obj) => obj[str] == e[str]))
    }
    else {
      var fun = waoooooooo.identity
      var arguments = waoooooooo.flattenDeep(args)
      var result = array.filter((e) => !(arguments.find((val) => fun(e) == val)))
    }
    return result
  },

  differenceWith: (array, ...args) => {
    var fun = args.at(-1)
    args.pop()
    var arguments = waoooooooo.flattenDeep(args)
    return array.filter(e => !arguments.reduce((flag, val) => flag || fun(e, val), false)
    )
  },

  fromPairs:pairs => pairs.reduce((obj ,element) =>{obj[element[0]]=element[1];return obj},{}),
}

