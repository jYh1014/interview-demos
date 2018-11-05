'use strict'
class EmitterEvent {
  constructor() {
  //构造器。实例上创建一个事件池
    this._event = {};
  }
  //on 订阅
  on (eventName, handler) {
  // 根据eventName，事件池有对应的事件数组，有就push添加，没有就新建一个。
  // 严谨一点应该判断handler的类型，是不是function
    if(this._event[eventName]) {
      this._event[eventName].push(handler);
    } else {
      this._event[eventName] = [handler];
    }
  }
  emit (eventName) {
  // 根据eventName找到对应数组
    var events = this._event[eventName];
  //  取一下传进来的参数，方便给执行的函数
    var otherArgs = Array.prototype.slice.call(arguments,1);
    console.log(arguments)
    var that = this;
    if(events) {
      events.forEach((event) => {
        event.apply(that, otherArgs);
      })
    }
  }
  // 解除订阅
  off (eventName, handler) {
    var events = this._event[eventName];
    if(events) {
      this._event[eventName] = events.filter((event) => {
        return event !== handler;
      })
    }
  }
  // 订阅以后，emit 发布执行一次后自动解除订阅
  once (eventName, handler) {
    var that = this;
    function func () {
      var args = Array.prototype.slice.call(arguments,0);
      console.log(arguments)
      handler.apply(that, args);
      this.off(eventName,func);
    }
    this.on(eventName, func);
  }
}

var event = new EmitterEvent();
function a (something) {
  console.log(something,'aa-aa');
}
function b (something) {
  console.log(something);
}
 event.once('dosomething',a);
 event.emit('dosomething', {'q':123});
 
 //event.emit('dosomething');

// event.on('dosomething',a);
// event.on('dosomething',b);
// event.emit('dosomething','chifan');
// event.off('dosomething',a);
// setTimeout(() => {
//   event.emit('dosomething','hejiu');
// },2000)