//1.map遍历：
// a: map方法返回一个新数组，数组中每一个元素为原数组元素调用回调函数处理后返回的结果,不修改原数组
//b: 当item为引用类型的时候，对item里的数据进行修改还是会改变原数组的
//eq:
let mapArr1 = [{
  a: 10, b: 20
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
Array.prototype.selfMap = function (fn, arr) {
  var newArr = []
  for (var i = 0; i < this.length; i++) {
    if (arr) {
      newArr.push(fn.call(arr, this[i], i, this))
    } else {
      newArr.push(fn(this[i], i, this))
    }
  }
  return newArr
}
let newdata = mapArr1.selfMap(function (item, index, arr) {
  console.log(this, arr)
  item.a = 100
  return item
}, mapArr1)
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
Array.prototype.selfEach = function (fn, arr) {
  for (var i = 0; i < this.length; i++) {
    if (arr) {
      fn.call(arr, this[i], i, this)
    } else {
      fn(this[i], i, this)
    }
  }
}
mapArr1.forEach(function (item, index, arr) {
  console.log(item)
}, mapArr1)

//3.Array.from
//主要将类似数组的对象和可遍历（包含iterator接口）的对象转化为数组
//类似数组的对象：本质特点是带有length属性
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
Array.from('foo') //['f','o','o']
function foo(){
  const args = [...arguments];
  return args
}
console.log(foo(1))
Array.from([1,2,3], o => o*o) //类似于map，如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this

//4.Array.of
//Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组
//附：实现原理
function ArrayOf(){
  return [].slice.call(arguments);
}
console.log(ArrayOf(1,2,34))


//5.数组实例的copyWithin
//在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

//6.find 用于找出第一个符合条件的数组成员,如果没有符合条件的成员，则返回undefined
//7. findIndex 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); //['0','a']

//8.includes 返回一个布尔值，表示某个数组是否包含给定的值(该方法的第二个参数表示搜索的起始位置，默认为0)
[NaN].indexOf(NaN) //-1
[NaN].includes(NaN) //true

//9.flat 
//用于将嵌套的数组“拉平”，变成一维的数
//如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数

//10.some 对数组的每一项都运行给定的函数，有一项返回 ture,则返回 true
function compare(element, index, array) {
  return element > 10;
}    
[2, 5, 8, 1, 4].some(compare);  // false
[12, 5, 8, 1, 4].some(compare); // true

//11.对数组的每一项都运行给定的函数，每一项都返回 ture,则返回 true
function isBigEnough(element, index, array) {
  return element < 10;
}    
[2, 5, 8, 3, 4].every(isBigEnough);   // true