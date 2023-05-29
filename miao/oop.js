//将MyMap，MySet，Vector，Complex，Stack，Queue，LinkedLi
class MyMap {
  constructor() {
    //容器容量
    this._capacity = 16
    //初始化数组容器
    this._pairs = new Array(this._capacity).fill(null)
    //数据数量
    this._size = 0
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

  put(key, val) {
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
    this._size++
    if (this._size / this._capacity > this._loadFactor) {
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
  remove(key) {
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
    this._size--
    if (this._capacity != 16 && this._size < this._capacity / 4) {
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
    this._size = 0
    arr.forEach((linkedList) => {
      while (linkedList) {
        this.put(linkedList.key, linkedList.val)
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
    this._size = 0
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
    this._size++
    if (this._size / this._capacity > this._loadFactor) {
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
  contains(key) {
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
  remove(key) {
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
    this._size--
    if (this._capacity != 16 && this._size < this._capacity / 4) {
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
    this._size = 0
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
    this._x = x
    this._y = y
  }
  plus(vector) {
    return new Vector(vector._x + this._x, vector._y + this._y)
  }
  minus(vector) {
    return new Vector(vector._x - this._x, vector._y - this._y)
  }
  get length() {
    return Math.sqrt(this._x * this._x + this._y * this._y)
  }
}

class Complex {
  constructor(ip, re) {
    this.ip = ip
    this.re = re
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
    count++
  }
  pop() {
    //删除头结点
    var result = null

    if (this.head === null) {

    } else if (this.head === this.end) {
      //如果只有一个
      var result = this.head.val
      this.head = this.end = null
      count--
    } else {
      var result = this.head.val
      this.head = this.head.next
      count--
    }
    return result
  }
  get size() {
    return this.count
  }
}

class Queue {

}
