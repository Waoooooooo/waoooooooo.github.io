//将MyMap，MySet，Vector，Complex，Stack，Queue，LinkedLi
//堆
class PriorityQueue {
  constructor(arr = [], fun = i => i) {
    this.fun = fun
    this.arr = arr
    if (this.arr.length != 0) {
      this.heapify()
    }
  }
  //交换函数
  swap(i, j) {
    var a = this.arr[i]
    this.arr[i] = this.arr[j]
    this.arr[j] = a
  }
  //push
  //接受一个值 将其放于数组的末尾 然后向上调整
  push(val) {
    this.arr.push(val)
    var i = this.arr.length - 1
    while (true) {
      //如果根节点的值小于当前节点 则交换根节点与当前节点
      //在完美二叉树中 根节点的下标为 (i-1)>>1
      var root = (i - 1) >> 1
      if (this.fun(this.arr[root]) < this.fun(this.arr[i])) {
        this.swap(root, i)
        i = root
      } else {
        break
      }
    }
    return this.arr
  }
  //pop
  //弹出堆顶的值
  pop() {
    this.swap(0, this.arr.length - 1)
    var max = this.arr.pop()
    this.heapDown(0)
    return max
  }
  peek() {
    return this.arr[0]
  }
  //向下调整
  heapDown(i) {
    //i的左右节点的值在数组中对应的位置
    var left = i * 2 + 1
    var right = i * 2 + 2
    var max = i
    if (left < this.arr.length && this.fun(this.arr[i]) < this.fun(this.arr[left])) {
      max = left
    }
    if (right < this.arr.length && this.fun(this.arr[max]) < this.fun(this.arr[right])) {
      max = right
    }
    //取到三个数中最大数的下标
    if (max != i) {
      this.swap(max, i)
      this.heapDown(max)
    }
  }
  //堆化
  heapify() {
    //从倒数第二层的最后一个`元素((arr.length -1)>>1)开始，以该元素为堆顶向下调整
    for (var i = (this.arr.length - 1) >> 1; i >= 0; i--) {
      this.heapDown(i)
    }
    return this.arr
  }
  get size() {
    return this.arr.length
  }
}
class MyMap {
  constructor() {
    //容器容量
    this._capacity = 16
    //初始化数组容器
    this._pairs = new Array(this._capacity).fill(null)
    //数据数量
    this.size = 0
    //kuorong因子
    this._loadFactor = 0.5
  }
  getHashNum(key) {
    var seed = 1313
    var hash = 0
    key = String(key)
    for (var char of key) {
      var code = char.charCodeAt(0)
      hash = (hash * seed + code) >>> 0 // 溢出后只保留低32位
    }
    return hash % this._capacity
  }
  set(key, val) {
    var hashNum = this.getHashNum(key)
    var p = this._pairs[hashNum]
    while (p) {
      if (p.key == key) {
        p.val = val
        return val
      }
      p = p.next
    }
    var node = { key, val, next: null }
    node.next = this._pairs[hashNum]
    this._pairs[hashNum] = node
    this.size++
    if (this.size / this._capacity > this._loadFactor) {
      this.kuorong();
    }
    return val
  }
  get(key) {
    var key = String(key)
    var hashNum = this.getHashNum(key)
    var head = this._pairs[hashNum]
    while (head) {
      if (head.key == key) {
        return head.val
      }
      head = head.next
    }
    return -1
  }
  has(key) {
    var key = String(key)
    var hashNum = this.getHashNum(key)
    var head = this._pairs[hashNum]
    while (head) {
      if (head.key == key) {
        return true
      }
      head = head.next
    }
    return false
  }
  delete(key) {
    var hashNum = this.getHashNum(key)
    var dummy = { next: this._pairs[hashNum] }
    var head = dummy
    while (head.next) {
      if (head.next.key == key) {
        head.next = head.next.next
        break
      }
      head = head.next
    }
    this._pairs[hashNum] = dummy.next
    this.size--
    if (this._capacity != 16 && this.size < this._capacity / 4) {
      this.suorong();
    }
  }
  kuorong() {
    this._capacity *= 2
    this.chuanjianxinshuzubingcopy()
  }
  suorong() {
    this._capacity = this._capacity / 2
    this.chuanjianxinshuzubingcopy()
  }
  chuanjianxinshuzubingcopy() {
    var arr = this._pairs
    this._pairs = new Array(this._capacity).fill(null)
    this.size = 0
    arr.forEach((linkedList) => {
      while (linkedList) {
        this.set(linkedList.key, linkedList.val)
        linkedList = linkedList.next
      }
    })
  }
}
class MySet {
  constructor() {
    //容器容量
    this._capacity = 16
    //初始化数组容器
    this._pairs = new Array(this._capacity).fill(null)
    //数据数量
    this.size = 0
    //kuorong因子
    this._loadFactor = 0.5
  }
  getHashNum(key) {
    var seed = 1313
    var hash = 0
    key = String(key)
    for (var char of key) {
      var code = char.charCodeAt(0)
      hash = (hash * seed + code) >>> 0 // 溢出后只保留低32位
    }
    return hash % this._capacity
  }
  add(key) {
    var hashNum = this.getHashNum(key)
    var p = this._pairs[hashNum]
    while (p) {
      if (p.key == key) {
        return
      }
      p = p.next
    }
    var node = { key, next: null }
    node.next = this._pairs[hashNum]
    this._pairs[hashNum] = node
    this.size++
    if (this.size / this._capacity > this._loadFactor) {
      this.kuorong();
    }
    return
  }
  get(key) {
    var key = String(key)
    var hashNum = this.getHashNum(key)
    var head = this._pairs[hashNum]
    while (head) {
      if (head.key == key) {
        return head.key
      }
      head = head.next
    }
    return -1
  }
  has(key) {
    var key = String(key)
    var hashNum = this.getHashNum(key)
    var head = this._pairs[hashNum]
    while (head) {
      if (head.key == key) {
        return true
      }
      head = head.next
    }
    return false
  }
  delete(key) {
    var hashNum = this.getHashNum(key)
    var dummy = { next: this._pairs[hashNum] }
    var head = dummy
    while (head.next) {
      if (head.next.key == key) {
        head.next = head.next.next
        break
      }
      head = head.next
    }
    this._pairs[hashNum] = dummy.next
    this.size--
    if (this._capacity != 16 && this.size < this._capacity / 4) {
      this.suorong();
    }
  }
  kuorong() {
    this._capacity *= 2
    this.chuanjianxinshuzubingcopy()
  }
  suorong() {
    this._capacity = this._capacity / 2
    this.chuanjianxinshuzubingcopy()
  }
  chuanjianxinshuzubingcopy() {
    var arr = this._pairs
    this._pairs = new Array(this._capacity).fill(null)
    this.size = 0
    arr.forEach((linkedList) => {
      while (linkedList) {
        this.add(linkedList.key)
        linkedList = linkedList.next
      }
    })
  }
}
class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(vector) {
    return new Vector(vector.x + this.x, vector.y + this.y)
  }
  minus(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
class Complex {
  constructor(real, imag) {
    this.real = real
    this.imag = imag
  }
  div(complex) {
    return new Complex((this.real * complex.real + this.imag * complex.imag) / (complex.imag ** 2 + complex.imag ** 2), (this.imag * complex.real - this.real * complex.imag) / (complex.imag ** 2 + this.imag ** 2))
  }
}
class Stack {
  // 用链表实现一个栈
  // 只有两个操作：
  // 进栈，出栈
  // 后进先出
  // 其每一个操作的时间复杂度都为O（1）
  constructor() {
    this.head = null
    this.end = null
    this.count = 0
  }
  push(val) {
    if (this.head === null) {
      this.head = this.end = { val, next: null }
    } else {
      var node = { val, next: null }
      node.next = this.head
      this.head = node
    }
    this.count++
  }
  pop() {
    //删除头结点
    var result = null
    if (this.head === null) {
    } else if (this.head === this.end) {
      //如果只有一个
      var result = this.head.val
      this.head = this.end = null
      this.count--
    } else {
      var result = this.head.val
      this.head = this.head.next
      this.count--
    }
    return result
  }
  get size() {
    return this.count
  }
}
class Queue {
  // 表示一个队列
  // 只有两个操作：
  // 从一端添加元素，从另一端删除元素
  // 先进先出
  // 其每一个操作的时间复杂度都为O（1）
  constructor() {
    this.head = null
    this.end = null
    this.count = 0
  }
  add(val) {
    //从end 处添加
    var node = { val, next: null }
    if (this.head == null) {
      this.head = this.end = node
    } else {
      this.end.next = node
      this.end = node
    }
    this.count++
  }
  pop() {
    //从head处删除
    var result = undefined
    result = this.head.val
    if (this.head == null) {
      return
    } else if (this.head == this.end) {
      this.head = this.end = null
    } else {
      this.head = this.head.next
    }
    this.count--
    return result
  }
  get size() {
    return this.count
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.end = null
    this.count = 0
  }
  append(val) {
    var node = { val, next: null }
    if (this.head == null) {
      this.head = this.end = node
    } else {
      this.end.next = node
      this.end = node
    }
    this.count++
  }
  prepend(val) {
    var node = { val, next: null }
    if (this.head == null) {
      this.head = this.end = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.count++
  }
  at(index) {
    var p = this.head
    while (p) {
      if (index == 0) {
        return p.val
      }
      index--
      p = p.next
    }
  }
  get size() {
    return this.count
  }
}

/**
 *
 * @param {*} regExp
 * @returns
 */
// String.prototype.mymatch
// String.prototype.mymatchAll
// String.prototype.myreplace
// String.prototype.myreplaceAll
// String.prototype.mysearch
// RegExp.prototype.mytest

// 利用RegExp.prototype.exec实现以上所有函数
// 调用方式跟自带的一样
// String.prototype.mymatch
String.prototype.mymatch = function (regExp) {
  if (typeof regExp == "string") {
    regExp = new RegExp(regExp)
  }
  var str = this
  var arr = []
  while (match = regExp.exec(str)) {
    if (!regExp.global) {
      return match
    }
    arr.push(match[0])
  }
  return arr
}
// String.prototype.mymatch
String.prototype.mymatch = function (regExp) {
  if (typeof regExp == "string") {
    regExp = new RegExp(regExp)
  }
  var str = this
  var arr = []
  while (match = regExp.exec(str)) {
    if (!regExp.global) {
      return match
    }
    arr.push(match[0])
  }
  return arr
}
// String.prototype.myreplace
String.prototype.myreplace = function (regExp, replaceStr) {
  if (typeof regExp == "string") {
    regExp = new RegExp(regExp)
  }
  if (regExp.global) {
    return this.myreplaceAll(regExp, replaceStr)
  }
  if (typeof replaceStr == "string") {
    var s = replaceStr
    replaceStr = e => s
  }
  var match = regExp.exec(this)
  if (match) {
    var end = match.index + match[0].length
    var start = match.index
    //match.index 到match[0].length替换为 replaceStr
    return this.slice(0, start) + replaceStr(this.slice(start, end)) + this.slice(end)
  } else {
    return this.toString()
  }
}

// String.prototype.myreplaceAll
String.prototype.myreplaceAll = function (regExp, replaceStr) {
  if (typeof regExp == "string") {
    regExp = new RegExp(regExp, "gd")
  }
  if (!regExp.global) {
    regExp = new RegExp(regExp.source, "gd")
  }
  if (typeof replaceStr == "string") {
    var s = replaceStr
    replaceStr = e => s
  }
  var match
  var last = 0
  var str = ""
  while (match = regExp.exec(this)) {
    //1.拼接   从上次结束到这次匹配正则开始的部分
    str += this.slice(last, match.index)
    //3.将结束下标保存
    last = regExp.lastIndex
    //2.将当前分组的内容依次存入
    arr = match.filter(e => e)
    if (match.length > 1) {
      //有分组
      for (let index = 1; index < arr.length; index++) {
        str += replaceStr(match, arr[index])
      }
    }else{
      str += replaceStr(match)
    }
  }
  //循环结束后 将剩余部分拼接上去
  str += this.slice(last)
  return str
}

// String.prototype.mysearch
String.prototype.mysearch = function (regExp) {
  if (typeof regExp == "string") {
    regExp = new RegExp(regExp)
  }
  var str = this
  var lastIndex = 0
  var match = regExp.exec(str)
  if (match) {
    return match.index
  } else {
    return -1
  }

}

// RegExp.prototype.mytest
RegExp.prototype.mytest = function (regExp) {
  if (regExp == null) {
    return -1
  }
  if (typeof regExp == "string") {
    regExp = new RegExp(regExp)
  }
  var str = this
  var match = regExp.exec(str)
  return match !== null
}

String.prototype.mysplit = function (regExp) {
  if (typeof regExp == "string") {
    regExp = new RegExp(regExp, "gd")
  }
  if (!regExp.global) {
    regExp = new RegExp(regExp.source, "gd")
  }
  var match
  var last = 0
  var arr = []
  regExp.global = true
  while (match = regExp.exec(this)) {
    //1.拼接   从上次结束到这次匹配正则开始的部分
    arr.push(this.slice(last, match.index))
    //3.将结束下标保存
    last = regExp.lastIndex
    //2.将当前分组的内容依次存入
    match = match.filter(e => e)
    if (match.length > 1) {
      //有分组
      for (let index = 1; index < match.length; index++) {
        arr.push(match[index])
      }
    }
  }
  //循环结束后 将剩余部分拼接上去
  arr.push(this.slice(last))
  return arr
}
