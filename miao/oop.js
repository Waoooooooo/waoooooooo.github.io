//将MyMap，MySet，Vector，Complex，Stack，Queue，LinkedLi
class MyMap {
  constructor() {
    //容器容量
    this._capacity = 16
    //初始化数组容器
    this._pairs = new Array(this._capacity).fill(null)
    //数据数量
    this.size = 0
    //扩容因子
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
      this.扩容();
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
      this.缩容();
    }
  }

  扩容() {
    this._capacity *= 2
    this.创建新数组并搬运()
  }
  缩容() {
    this._capacity = this._capacity / 2
    this.创建新数组并搬运()
  }

  创建新数组并搬运() {
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
    //扩容因子
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
      this.扩容();
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
      this.缩容();
    }
  }

  扩容() {
    this._capacity *= 2
    this.创建新数组并搬运()
  }
  缩容() {
    this._capacity = this._capacity / 2
    this.创建新数组并搬运()
  }

  创建新数组并搬运() {
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
    return new Vector(vector.x - this.x, vector.y - this.y)
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}

class Complex {
  constructor(real , imag ) {
    this.real  = real
    this.imag  = imag
  }
  div(complex){

    return  new Complex(( this.real * complex.real + this.imag*complex.imag )/ (complex.imag**2 +complex.imag**2) ,  (complex.real*this.imag - this.real*complex.imag)  / (complex.imag**2 +complex.imag**2))
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
    result =this.head.val
    if (this.head == null) {
      return
    } else if (this.head == this.end) {
      this.head = this.end = null
    } else{
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
    var node = {val,next : null}
    if (this.head == null) {
      this.head = this.end = node
    }else{
      this.end.next = node
      this.end= node
    }
    this.count++
  }
  prepend(val) {
    var node = {val,next : null}
    if (this.head == null) {
      this.head = this.end = node
    }else{
      node.next =  this.head
      this.head= node
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
