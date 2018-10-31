// import './closure.js'
// import './module'
// let a = 10,b
// function P(fn) {
//     var value = null;
//     var events = [];
//     this.then = function (f) {
//         events.push(f);
//         return this;
//     }
//     function resolve(newValue) {
//         setTimeout(function(){
//             var f = events.shift();
//             f(newValue, resolve);
//         },0)
        
//     }
//     fn(resolve);
// }

// function a() {
//     return new P(function (resolve) {
//         console.log("get...");
//         // setTimeout(function () {
//             console.log("get 1");
//             resolve(1);
//         // }, 1000)
//     });
// }
// a()
//     .then(function (value, resolve) {
//         console.log("get...");
//         setTimeout(function () {
//             console.log("get 2");
//             resolve(2);
//         }, 1000)
//     })
//     .then(function (value, resolve) {
//         console.log(value)
//     })



function Promise(fn){
    let events = []
    this.then = function(f){
        events.push(f)
        return this
    }
    function resolve(value){
        console.log(events)
        events.map(e => {
            e(value,resolve)
        })
    }
    fn(resolve)
    
}
function fun(){
    return new Promise(function(resolve){
        console.log(11)
        setTimeout(function(){
            console.log(13)
            resolve(11)
        },0)
       
    })
}
fun().then(function(value,resolve){
    
    console.log(value)
    
})
for(let i in [1,2,3]){
    console.log(i)
}

// function fun() {
//     var base = 0
//     return function() {
//        console.log(++base)
//     }
// }

// let a = fun()
// a()
// a()
// a()



// 　　var name = "The Window";
// 　　var object = {
// 　　　　name : "My Object",
// 　　　　getNameFunc : function(){
// 　　　　　　return function(){
// 　　　　　　　　return this.name;
// 　　　　　　};

// 　　　　}

// 　　};
// console.log(object.getNameFunc()())
