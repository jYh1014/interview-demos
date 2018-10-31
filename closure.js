////闭包test
　
//1.
　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};

　　　　}
　　};
// console.log(object.getNameFunc()())
//注意：作用域链的理解，每个函数自身都有一个this


//2.
// for (var i = 1; i <= 5; i++) {
    
//      let id =  setTimeout( function timer() {
    
//           console.log(i);
    
//       }, 1000 );
//       console.log(id)
    
// }
//setTimeout是异步的，要等循环结束后再执行。用闭包改造 （或使用let）使其输出12345

// for(var i = 1; i<= 5; i++){
//     (setTimeout( function timer() {
        
//         console.log(i);
        
//      }, 1000 ))(i)
// }
//匿名函数立即执行

for (var i = 0; i < 3; i++) {
    var i  = 'abc';
    console.log(i);
  }


//3.
function fun(n,o){
    console.log(o);
    return {
        fun:function(m){
            return fun(m,n);
        }
    };
 }

 var a = fun(0);a.fun(1);a.fun(2);a.fun(3);
//  var b = fun(0).fun(1).fun(2).fun(3);
//  var c = fun(0).fun(1);c.fun(2);c.fun(3);