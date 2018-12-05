//类的修饰
@testable
class MyTestableClass {
  
}

function testable(target) {
  target.isTestable = true;
}

let res = MyTestableClass.isTestable // true
console.log(res)