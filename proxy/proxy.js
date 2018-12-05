//proxy

/*   api
get()：拦截对象属性的读取。
set()：拦截对象属性的设置。
apply()：拦截函数的调用、call和apply操作。
has()：即判断对象是否具有某个属性时，这个方法会生效，返回一个布尔值。它有两个参数：目标对象、需查询的属性名。
construct()：用于拦截new命令。参数：target(目标对象)、args(构造函数的参数对象)、newTarget(创建实例对象时，new命令作用的构造函数)。
deleteProperty()：拦截delete proxy[propKey]的操作，返回一个布尔值。
defineProperty()：拦截object.defineProperty操作。
getOwnPropertyDescriptor()：拦截object.getownPropertyDescriptor()，返回一个属性描述对象或者undefined。
getPrototypeOf()：用来拦截获取对象原型。可以拦截Object.prototype.__proto__、Object.prototype.isPrototypeOf()、Object.getPrototypeOf()、Reflect.getPrototypeOf()、instanceof
isExtensible()：拦截Object.isExtensible操作，返回布尔值。
ownKeys()：拦截对象自身属性的读取操作。可拦截Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Object.keys()、for...in循环。
preventExtensions()：拦截Object.preventExtensions()，返回一个布尔值。
setPrototypeOf()：拦截Object.setPrototypeOf方法。
revocable()：返回一个可取消的proxy实例。
*/

const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!${receiver}`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === 'text') {
      input.value = value;
      p.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
});

input.addEventListener('keyup', function(e) {
  newObj.text = e.target.value;
});
