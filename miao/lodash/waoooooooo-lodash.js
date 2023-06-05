
var waoooooooo = {
  identity: function (e) {
    return e
  },
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
  dropRightWhile: (array, predicate = waoooooooo.identity) => array.slice(0, waoooooooo.findIndexForDrop(array, predicate)),
  //去除array中从起点开始到 predicate 返回假值结束部分
  dropWhile: (array, predicate = waoooooooo.identity) => array.slice(waoooooooo.findLastIndexForDrop(array, predicate) + 1),

  findIndexForDrop: (array, predicate = waoooooooo.identity, fromIndex = 0) => {
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
  findLastIndexForDrop: (array, predicate = waoooooooo.identity, fromIndex = 0) => {
    if (typeof predicate == "function") {
      for (let index = array.length - 1; index >= fromIndex; index--) {
        if (predicate(array[index])) {
          return index
        }
      }
    } else {
      //如果predicate不是函数
      for (let index = array.length - 1; index >= fromIndex; index--) {
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
    return waoooooooo.deweight(arr)
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

  fromPairs: pairs => pairs.reduce((obj, element) => { obj[element[0]] = element[1]; return obj }, {}),

  head: array => array.length ? array[0] : undefined,

  indexOf: (array, value, fromIndex = 0) => {
    for (let index = fromIndex; index < array.length; index++) {
      const element = array[index];
      if (element == value) {
        return index
      }
    }
    return -1
  },

  lastIndexOf: (array, value, fromIndex = array.length - 1) => {
    for (let index = fromIndex; index >= 0; index--) {
      const element = array[index];
      if (element == value) {
        return index
      }
    }
    return -1
  },


  /**
   * 去重deweight
   * @param {*} arr
   * @returns 去重后的新数组
   */
  deweight: arr => {
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

  initial: array => array.slice(0, array.length - 1),


  /**
   * intersection系列
   * @param  {...any} arrays 参数为多个数组
   * @returns 返回交集组成的数组
   */
  intersection: (...arrays) => {
    var map = {}
    var length = arrays.length
    for (var array of arrays) {
      //去重
      var newArray = waoooooooo.deweight(array)
      for (var e of newArray) {
        if (e in map) {
          map[e]++
        } else {
          map[e] = 1
        }
      }
    }
    var result = []
    for (var key in map) {
      if (map[key] == length) {
        result.push(+key)
      }
    }
    return result
  },

  intersectionBy: (...arrays) => {

    var map = {} //存储出现的次数
    var map2 = {} //存储出现的次数的 key对应的原始值
    var iteratee = waoooooooo.by(arrays.at(-1))
    var length = arrays.length - 1
    arrays = arrays.slice(0, length)
    //去重
    for (var array of arrays) {
      var newArray = waoooooooo.deweight(array)
      for (var e of newArray) {
        var val = iteratee(e)
        if (val in map) {
          map[val]++
        } else {
          map[val] = 1
          map2[val] = e
        }
      }
    }
    var result = []
    for (var key in map) {
      if (map[key] == length) {
        result.push(map2[key])
      }
    }
    return result
  },

  intersectionWith: (...args) => {
    var comparator = args.at(-1) //比较函数,放入两个元素 返回布尔类型
    var arrays = args.slice(0, args.length - 1) //取交集的参数
    var length = arrays.length
    var result = [] //结果数组
    var comparatorArr = waoooooooo.deweight(arrays[0]) //去重
    var map = new Map()
    for (let index = 1; index < arrays.length; index++) {
      var arr = waoooooooo.deweight(arrays[index]) //去重
      for (const o of arr) {
        for (const comp of comparatorArr) {
          if (comparator(o, comp)) {
            //如果结果为真 ,将样本数组(arrays[0])的值存入映射  --第一次需要初始化
            if (map.has(comp)) {
              map.set(comp, map.get(comp) + 1)
            } else {
              map.set(comp, 2)
            }
          }
        }
      }
    }
    //循环结束后取出map中值与数组长度相等的
    for (var entry of map) {
      var key = entry[0]
      var value = entry[1]
      if (value == length) {
        result.push(key)
      }
    }
    return result
  },

  //将 array 中的所有元素转换为由 separator 分隔的字符串。
  join: (array, separator = ',') => array.reduce((str, e) => str + e + separator, "").slice(0, -1),

  //获取array中的最后一个元素。
  last: array => array.at(-1),

  //获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
  nth: (array, n = 0) => n >= 0 ? array[n] : array[array.length + n],

  //移除数组array中所有和给定值相等的元素，使用SameValueZero 进行全等比较。
  //这个方法会改变数组
  pull: (array, ...values) => {
    var set = new Set(waoooooooo.flattenDeep(values))
    var moveLength = 0
    for (let index = 0; index < array.length; index++) {
      if (set.has(array[index])) {
        //如果碰到要删除的元素移动距离加1
        moveLength++
      } else {
        //如果碰到不需要删除的元素,则向前跳moveLength
        array[index - moveLength] = array[index]
      };
    }
    while (moveLength) {
      array.pop()
      moveLength--
    }
    return array
  },

  pullAll: (array, ...values) => waoooooooo.pull(array, values),

  pullAllBy: (array, ...values) => {
    var arr = values[0]
    var iteratee = values[1]
    //如果没有传参 设置iteratee初始值为 identity
    if (!iteratee) {
      iteratee = waoooooooo.identity
    }
    if (typeof iteratee !== "function") {
      //Array|Object|string
      if (Array.isArray(iteratee)) {
        //???
      } else if (typeof iteratee == "object") {
        //???
      } else if (typeof iteratee == "string") {
        var key = iteratee
        iteratee = e => e[key]
      }
    }
    var arr = arr.map(iteratee)
    var moveLength = 0
    var set = new Set(arr)
    for (let index = 0; index < array.length; index++) {
      if (set.has(iteratee(array[index]))) {
        //如果碰到要删除的元素移动距离加1
        moveLength++
      } else {
        //如果碰到不需要删除的元素,则向前跳moveLength
        array[index - moveLength] = array[index]
      };
    }
    while (moveLength) {
      array.pop()
      moveLength--
    }
    return array
  },

  // ***some***
  pullAllWith: (array, ...values) => {
    var arr = values[0]
    var comparator = values[1]
    var moveLength = 0
    for (let index = 0; index < array.length; index++) {
      //和对照组的每个元素比较,一真为真,全假为假
      if (arr.some(e => comparator(e, array[index]))) {
        //如果碰到要删除的元素移动距离加1
        moveLength++
      } else {
        //如果碰到不需要删除的元素,则向前跳moveLength
        array[index - moveLength] = array[index]
      };
    }
    while (moveLength) {
      array.pop()
      moveLength--
    }
    return array
  },

  pullAt: (array, ...indexes) => {
    indexes = waoooooooo.flattenDeep(indexes)
    var set = new Set(indexes)
    var moveLength = 0
    var result = []
    for (let index = 0; index < array.length; index++) {
      if (set.has(index)) {
        //如果碰到要删除的元素移动距离加1
        moveLength++
        result.push(array[index])
      } else {
        //如果碰到不需要删除的元素,则向前跳moveLength
        array[index - moveLength] = array[index]
      };
    }
    while (moveLength) {
      array.pop()
      moveLength--
    }
    return result
  },

  //反转array，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推。
  //这个方法会改变原数组
  reverse: (array) => {
    //双指针
    var l = 0
    var r = array.length - 1
    while (l < r) {
      var a = array[l]
      array[l] = array[r]
      array[r] = a
      l++
      r--
    }
    return array
  },

  slice: (array, start = 0, end = array.length) => array.reduce((arr, e, i) => {
    if (i >= start && i < end) {
      arr.push(e)
    }
    return arr
  }, []),

  //使用二进制的方式检索来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。
  // 返回 value值 应该在数组array中插入的索引位置 index。
  sortedIndex: (array, value) => { },

  //_.every(collection, [predicate=_.identity])
  //这个方法对于对于空集合返回 true，因为空集合的任何元素都是 true 。(默认为true)
  every: (collection, predicate = waoooooooo.identity) => {
    var flag = true
    predicate = waoooooooo.by(predicate)
    for (const iterator of collection) {
      if (!predicate(iterator)) {
        return false
      }
    }
    return flag
  },

  //通过 predicate（断言函数） 检查collection（集合）中的元素是否存在 任意 truthy（真值）的元素，
  //一旦 predicate（断言函数） 返回 truthy（真值），遍历就停止。
  // predicate 调用3个参数：(value, index|key, collection)。
  some: (collection, predicate = waoooooooo.identity) => {
    predicate = waoooooooo.by(predicate)
    for (const iterator of collection) {
      if (predicate(iterator)) {
        return true
      }
    }
    return false
  },


  /**
   *
   * @param {Array|Object} collection : 一个用来迭代的集合。
   * @param {Function} iteratee (Array|Function|Object|string): 一个迭代函数，用来转换key（键）。
   */
  countBy: (collection, iteratee = waoooooooo.identity) => {
    //iteratee处理 *******
    iteratee = waoooooooo.by(iteratee)
    var map = {}
    for (const val of collection) {
      if (iteratee(val) in map) {
        map[iteratee(val)]++
      } else {
        map[iteratee(val)] = 1
      }
    }
    return map
  },

  /**
   * groupBy
   * @param {*} collection
   * @param {*} iteratee
   * @returns map[处理过的key : key原始值数组]
   */
  groupBy: (collection, iteratee = waoooooooo.identity) => {
    //iteratee处理 *******
    iteratee = waoooooooo.by(iteratee)
    var map = {}
    for (const val of collection) {
      if (iteratee(val) in map) {
        map[iteratee(val)].push(val)
      } else {
        map[iteratee(val)] = [val]
      }
    }
    return map
  },

  keyBy: (collection, iteratee = waoooooooo.identity) => {
    //iteratee处理 *******
    iteratee = waoooooooo.by(iteratee)
    var map = {}
    for (const val of collection) {
      map[iteratee(val)] = val
    }
    return map
  },

  /**
   *
   * @param {*} collection
   * @param {*} iteratee
   * @returns
   */
  forEach: (collection, iteratee = waoooooooo.identity) => {
    iteratee = waoooooooo.by(iteratee)
    for (const key in collection) {
      iteratee(collection[key], key, collection)
    }
    return collection
  },

  forEachRight: (collection, iteratee = waoooooooo.identity) => {
    iteratee = waoooooooo.by(iteratee)
    //倒序forEach
    var arr = []
    for (const key in collection) {
      arr.push(key)
    }
    for (let index = arr.length - 1; index >= 0; index--) {
      var key = arr.pop()
      iteratee(collection[key], key, collection)
    }
    return collection
  },

  /**
   * map
   * @param {*} collection
   * @param {*} iteratee
   * @return {Array}
   */
  map: (collection, iteratee = waoooooooo.identity) => {
    iteratee = waoooooooo.by(iteratee)
    var arr = []
    for (const key in collection) {
      arr.push(iteratee(collection[key], isNaN(Number(key)) ? key : Number(key), collection))
    }
    return arr
  },

  /**
   *
   * @param {*} collection
   * @param {*} predicate
   * @returns
   */
  filter: (collection, predicate = waoooooooo.identity) => {
    predicate = waoooooooo.transformPredicate(predicate)
    var arr = []
    for (const key in collection) {
      if (predicate(collection[key], isNaN(Number(key)) ? key : Number(key), collection)) {
        arr.push(collection[key])
      }
    }
    return arr
  },


  //每次返回的值会作为下一次迭代使用(accumulator:累加器)
  /**
   * reduce :累加迭代
   * @param {*} collection
   * @param {*} iteratee
   * @param {*} accumulator
   * @return {Array}
   */
  reduce: (collection, iteratee = waoooooooo.identity, accumulator = 0) => {
    iteratee = waoooooooo.by(iteratee)
    for (const key in collection) {
      accumulator = iteratee(accumulator, collection[key], key)
    }
    return accumulator
  },

  /**
   *
   * @param {*} collection
   * @return {Number}
   */
  size: collection => waoooooooo.reduce(collection, e => e + 1),


  sample:(collection)=>{},
  /**
   * sortBy
   * @param1 {*} (Array|Object): 用来迭代的集合。
   * @param2 {*} iterateess (...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[]))
   * @returns
   */
  sortBy: (collection, iterateess = waoooooooo.identity) => {
    if (!Array.isArray(iterateess)) {
      iterateess = [iterateess]
    }
    collection.sort((a, b) => {
      for (const iterator of iterateess) {
        var iterator = waoooooooo.by(iterator)
        var a = iterator(a)
        var b = iterator(b)
        if (a < b) {
          return -1
        }else if (a > b){
          return 1
        }
      }
      return 0
    })

},






  /**
   * transformPredicate :处理predicate的函数
   * @param {*} predicate
   * @return {Function}
   */
  transformPredicate: (predicate) => {
    if(typeof predicate !== "function") {
  //Array|Object|string
  //参数(value, index|key, collection)
  if (Array.isArray(predicate)) {
    var key = predicate[0]
    var value = predicate[1]
    predicate = e => e[key] == value
  } else if (typeof predicate == "object") {
    var obj = predicate
    predicate = e => {
      //e的每个key value
      for (const key in obj) {
        if (!waoooooooo.isEqual(obj[key], e[key])) {
          return false
        }
      }
      return true
    }
  } else if (typeof predicate == "string") {
    var key = predicate
    predicate = e => e[key]
  }
}
return predicate
  },

//BY系列处理iteratee函数
by: (iteratee = waoooooooo.identity) => {
  //iteratee处理 *******
  if (typeof iteratee !== "function") {
    //Array|Object|string
    //参数(value, index|key, collection)
    if (Array.isArray(iteratee)) {
      var key = iteratee[0]
      var value = iteratee[1]
      iteratee = e => e[key] == value
    } else if (typeof iteratee == "object") {
      var obj = iteratee
      iteratee = e => waoooooooo.isEqual(e, iteratee)
    } else if (typeof iteratee == "string") {
      var keys = iteratee.split(".")
      iteratee = e => {
        var result = e
        for (const key of keys) {
          result = result[key]
        }
        return result
      }
    }
  }
  return iteratee
},

  //BY系列处理多个iteratees函数/數組
  byIteratees: (iteratees) => {
    if (iteratees) {

    }
    return iteratees
  },


    //深度全等方法(数组 对象 的值全等)
    isEqual: (a, b, ...args) => {
      var flag = true
      if (a === b) {
        return true
      }
      else if (typeof a == typeof b && typeof b == "object") {
        if (Array.isArray(a) !== Array.isArray(b)) {
          return false
        }
        for (const key in a) {
          if (!(key in b)) {
            return false
          }
          if (!(waoooooooo.isEqual(a[key], b[key]))) {
            return false
          }
        }
        for (const key in b) {
          if (!(key in a)) {
            return false
          }
          if (!(waoooooooo.isEqual(a[key], b[key]))) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    }



}

