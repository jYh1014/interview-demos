var it = makeIterator(['a','b'])
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
function makeIterator(arr){
  var nextIndex = 0
  return {
    next: function(){
      return nextIndex < arr.length ?
      {
        value: arr[nextIndex++], done: false
      }:   
      {
        value: undefined, done: true
      }
    }
  }
}
//原生具备iterator接口的数据接口如下:
// 1.Array
// 2.Map
// 3.Set
// 4.String
// 5.TypedArray
// 6.函数的 arguments 对象
// 7.NodeList 对象
//这些数据结构带有默认的iterator接口
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

// iter.next() // { value: 'a', done: false }
// iter.next() // { value: 'b', done: false }
// iter.next() // { value: 'c', done: false }
// iter.next() // { value: undefined, done: true }


//只要带有iterator接口 就是可以遍历的 eq:
const obj = {
  [Symbol.iterator]: function(){
    return {
      next: function(){
        return {value: 1, done: false}
      }
    }
  }
}
let objit = obj[Symbol.iterator]()
// console.log(objit.next())

function createFunctions(){
  var result = new Array();
  for (var i=0; i < 10; i++){
  result[i] = function(){
    
  return i;
  };
  }
  return result;
  }
  console.log(createFunctions()[0]())