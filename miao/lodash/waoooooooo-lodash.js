
var waoooooooo = {

  /**
   * 01 chunk
   * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
   * 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
   * @param {*} ary array (Array): 需要处理的数组
   * @param {*} size  [size=1] (number): 每个数组区块的长度
   * @return  (Array): 返回一个包含拆分区块的新数组（注：相当于一个二维数组）。
   */
  chunk: function (ary, size) {
    var result = []
    for (let index = 0; index < ary.length; index++) {
      var count = 0
      var arr = []
      for (let j = index; j < ary.length; j++) {
        count++
        arr.push(ary[j])
        if (count == size) {
          result.push(arr)
          count = 0
          index = j
          break
        }
      }
      if (count > 0) {
        //數組遍歷完有剩余
        result.push(arr)
        break
      }
    }
    return result
  },

  /**
    * 02 compact
    *    创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "",
    *    undefined, 和 NaN 都是被认为是“假值”。
    * @param {*} array array (Array): 待处理的数组
    * @return  (Array): 返回过滤掉假值的新数组。
    */
  compact: function (array) {
    return  array.filter( i=> i )
  },
}
