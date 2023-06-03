
var waoooooooo = {

  /**
   * 01 chunk
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
      if (count == size) {
        count = 0
        j++
        result[j]=[]
      }
    }
    return result
},

  /**
    * 02 compact
    *    创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "",
    *    undefined, 和 NaN 都是被认为是“假值”。
    * @param {Array} array : 待处理的数组
    * @return{Array}: 返回过滤掉假值的新数组。
    */
  compact: array => array.filter(i => i),
  /**
   * 03 concat
   *    创建一个新数组，将array与任何数组 或 值连接在一起。
   * @param {Array} array  被连接的数组。
   * @param  {...any} args 连接的值
   */
  concat: (array,...args) =>array.concat(...args),


  fill:(array, value, start=0, end=array.length) =>{

  }

}
