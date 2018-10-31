//1.map遍历：
// a: map方法返回一个新数组，数组中每一个元素为原数组元素调用回调函数处理后返回的结果,不修改原数组
//b: 当item为引用类型的时候，对item里的数据进行修改还是会改变原数组的
//eq:
let mapArr1 = [{
  a: 10, b:20
}]

let mapArr2 = mapArr1.map(item => {
  item.a = 30
  return item
})

let mapArr3 = mapArr1.map(item => 
  item.a = 30
)

// console.log(mapArr1) //[{a:30,b:20}]
// console.log(mapArr2) //[{a:30,b:20}]
// console.log(mapArr3) //[30]

//附：实现原理
Array.prototype.selfMap = function(fn, arr){
  console.log(this)
  var newArr = []
  for(var i = 0; i < this.length; i++){
    if(arr){
      newArr.push(fn.call(arr, this[i], i, this))
    }else{
      newArr.push(fn(this[i],i,this))
    }
  }
  return newArr
}
let newdata = mapArr1.selfMap(function(item, index, arr){
  return item 
},mapArr1)
console.log(newdata)
//2.forEach遍历
// 修改原数组,无返回值
let eachArr1 = [{
  a: 10, b: 20
}]
eachArr1.forEach(item => {
  item.a = 50
})
// console.log(eachArr1) ///[{a: 50,b:20}]

//附：实现原理
Array.prototype.selfEach = function(fn, arr){
  for(var i = 0; i < this.length; i++){
    if(arr){
      fn.call(arr, this[i], i, this)
    }else{
      fn(this[i], i, this)
    }
  }
}
mapArr1.forEach(function(item,index,arr){
  console.log(item)
},mapArr1)
