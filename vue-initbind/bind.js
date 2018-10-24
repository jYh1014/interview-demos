function Vue(options){
  this.data = options.data
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
function nodeToFragment(node, vm){
  var flag = document.createDocumentFragment()
  console.log(flag)
  var child
  while(child = node.firstChild){
    compile(child, vm)
    flag.append(child)
  }
  return flag
}
function compile(node, vm){
  var reg = /\{\{(.*)\}\}/
  //节点类型为元素
  if(node.nodeType == 1){
    var attr = node.attributes
    for(var i = 0; i < attr.length; i++){
      if(attr[i].nodeName == 'v-model'){
        var name = attr[i].nodeValue
        node.value = vm.data[name]
        node.removeAttribute('v-model')
      }
    }
  }
  //节点类型为text
  if(node.nodeType == 3){
    if(reg.test(node.nodeValue)){
      var name = RegExp.$1
      name = name.trim()
      node.nodeValue = vm.data[name]
    }
  }
}