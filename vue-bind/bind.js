//修改输入框内容 => 在事件回调函数中修改属性值 => 触发属性的set方法
//发出通知dep.notify() => 触发订阅者的update方法 => 更新视图
//发布者发出通知 => 主题对象收到通知并推送给订阅者 => 订阅者执行相应操作

function defineReactive(obj, key, val) {
  var dep = new Dep()
  Object.defineProperty(obj, key, {
    get: function () {
      if(Dep.target){
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function (newVal) {
      if (val === newVal) return
      val = newVal
      console.log(val)
      dep.notify()
    }
  })
}

function observe(obj, vm) {
  Object.keys(obj).forEach(function (key) {
    defineReactive(vm, key, obj[key])
  })
}
function Dep(){//一个主题对象，收到通知推送给订阅者，data中的每一个属性生成一个主题对象dep
  this.subs = []
}
Dep.prototype = {
  addSub: function(sub){
    this.subs.push(sub)
  },
  notify: function(){
    // debugger
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
function nodeToFragment(node, vm) {
  var flag = document.createDocumentFragment()
  console.log(flag)
  var child
  while (child = node.firstChild) {
    compile(child, vm)
    flag.append(child)
  }
  return flag
}

function compile(node, vm) {
  var reg = /\{\{(.*)\}\}/
  //节点类型为元素
  if (node.nodeType == 1) {
    var attr = node.attributes
    for (var i = 0; i < attr.length; i++) {
      if (attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue
        node.addEventListener('input', function (e) {
          vm[name] = e.target.value
        })
        node.value = vm[name]
        node.removeAttribute('v-model')
      }
    }
  }
  //节点类型为text
  if (node.nodeType == 3) {
    if (reg.test(node.nodeValue)) {
      var name = RegExp.$1
      name = name.trim()
      // node.nodeValue = vm[name]
      new Watcher(vm,node,name)
    }
  }
}
function Watcher(vm,node,name){//订阅者 为每个与数据绑定相关的节点生成一个订阅者watcher，watcher会将自己添加到相应属性的dep中
  Dep.target = this
  this.node = node
  this.name = name
  this.vm = vm
  this.update()
  Dep.target = null
}
Watcher.prototype = {
  update: function(){
    this.get()
    this.node.nodeValue = this.value
  },
  get: function(){
    this.value = this.vm[this.name]
  }
}
function Vue(options) {
  debugger
  this.data = options.data
  var data = this.data
  observe(data, this)
  var id = options.el
  var dom = nodeToFragment(document.getElementById(id), this)
  document.getElementById(id).appendChild(dom)
}
var vm = new Vue({
  el:'app',
  data: {
    text: 'hello'
  }
})
