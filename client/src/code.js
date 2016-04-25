import {h, pre} from '@motorcycle/dom'; 

import {subject} from 'most-subject'

var sub = subject
var observer = sub.observer;
var stream = sub.stream;

var Monad = function Monad(z, g) {
  var _this = this;

  this.x = z;
  if (arguments.length === 1) {
    this.id = 'anonymous';
  } else {
    this.id = g;
  }

  this.bnd = function (func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return func.apply(undefined, [_this.x].concat(args));
  };

  this.ret = function (a) {
    window[_this.id] = new Monad(a,_this.id);
    return window[_this.id];
  };
};

var mMname = new Monad('Fred', 'mMname');

const monads = h('pre', {style: {color: '#AFEEEE' }}, `  var Monad = function Monad(z, g) {
    var _this = this;

    this.x = z;
    if (arguments.length === 1) {
      this.id = 'anonymous';
    } else {
      this.id = g;
    };

    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };

    this.ret = function (a) {
      O.[_this.id] = new Monad(a, _this.id);
      return O.[_this.id]
    };
  };               

  var Monad$ = function Monad$(z, g) {
    var _this = this;
    this.subject = subject();
    this.observer = this.subject.observer;
    this.stream = this.subject.stream;
    this.x = z;
    this.id = g;

    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };

    this.ret = function (a) {
      O[_this.id] = new Monad$(a,_this.id);
      _this.observer.next(a);
      console.log('Streaming from ', _this.id);
      return O[_this.id];
    };
  };

  var MonadIter = function MonadIter() {
    var _this = this;
    this.p = function (a, ... args) {};
  
    this.release = function (x, ...args) {
      return this.p(x, ...args);
    };
  
    this.bnd = function (func) {
      _this.p = func;
    };
  };

  var ret = function ret(v, id) {
    if (arguments.length === 1) {
      return (new Monad(v, 'anonymous'));
    }
    window[id] = new Monad(v, id);
    return window[id];
  }; ` )

var fib = h('pre', `  var fib = function fib(x) {
    return mMfib.ret([ O.mMfib.x[1], O.mMfib.x[0] + O.mMfib.x[1] ]);
  }

  var fibCalc = function(x, n) {
    mMfib.ret([0,1])
    for(let k in Array(n).fill(1)) mMfib.bnd(fib)
    return ret(O.mMfib.x[0])
  }   ` )  


var driver = h('pre', `  var websocketsDriver = function () {
      return create((add) => {
        socket.onmessage = msg => add(msg)
      })
  };
` )

var messages = h('pre', `  const messages$ = (sources.WS).map(e => 
    mMtem.ret(e.data.split(',')).bnd(v => {
    mMZ10.bnd(() => mM$1
      .ret([v[3], v[4], v[5], v[6]])
      .bnd(() => mM$2.ret([])))
    mMZ11.bnd(() => updateScoreboard(v[3]));
    mMZ12.bnd(() => mM6
      .ret(v[2] + ' successfully logged in.'))
    mMZ13.bnd(() => updateMessages(v))
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + v.x ))
    mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
      O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
      .bnd(refresh))
    mMZ16.bnd(() => process(e.data))
    mMtemp.ret(e.data.split(',')[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'CB#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)
      .bnd(next, 'DD#$42', mMZ16)
    }) 
  );  `  )

var next = h('pre',  `  var next = function next(x, y, mon2) {
    if (x === y) {
      mon2.release();
    }
    return ret(x);
  }
  
  var next2 = function next(x, condition, mon2) {
    if (condition) {
      mon2.release();
    }
    return ret(x);
  } `  )


var Monad$ = h('pre',  `  var Monad$ = function Monad$(z, g) {
      var _this = this;
      this.subject = subject();
      this.observer = this.subject.observer;
      this.stream = this.subject.stream;
      this.x = z;
      this.id = g;

      this.bnd = function (func, ...args) {
         return func(_this.x, ...args);
      };

      this.ret = function (a) {
        O[_this.id] = new Monad$(a,_this.id);
        _this.observer.next(a);
        return O[_this.id];
      };
    };
  `  )

var updateCalc = h('pre',  `  function updateCalc() { 
     mMZ2.bnd(() => O.mM13
                  .bnd(score, 1)
                  .bnd(next2, (O.mM13.x % 5 === 0), mMZ5) 
                  .bnd(newRoll));
     mMZ4.bnd(() => O.mM13
                  .bnd(score, 3)
                  .bnd(next2, (O.mM13.x % 5 === 0), mMZ5) 
                  .bnd(newRoll));
         mMZ5.bnd(() => O.mM13
                      .bnd(score,5)
                      .bnd(v => mM13.ret(v)
                      .bnd(next, 25, mMZ6)));
             mMZ6.bnd(() => mM9.bnd(score2) 
                          .bnd(next,3,mMZ7));
                mMZ7.bnd(() => mM13.bnd(winner));               
     O.mM3.bnd(x => mM7
                  .ret(calc(x[0], O.mM8.x, x[1]))
                  .bnd(next, 18, mMZ4)  
                  .bnd(next, 20, mMZ2) // Releases mMZ2 (above)
                  .bnd(() => O.mM$1.bnd(push, O.mM7.x, mM$1)
                  .bnd(() => mM3
                  .ret([])
                  .bnd(() => mM4
                  .ret(0).bnd(mM8.ret)
                  .bnd(cleanup)
                  ))))
  }
  `  )

var nums = h('pre',  `  
    const numClick$ = sources.DOM
      .select('.num').events('click');
       
    const numClickAction$ = numClick$.map(e => {
      console.log(e);
      if (O.mM3.x.length < 2) {
        O.mM3.bnd(push, e.target.innerHTML, O.mM3)
        mM28.ret(O.mMhistorymM1.x[O.mMindex2.x])
        .bnd(spliceRemove, e.target.id, O.mM$1)
        .bnd(mM$1.ret);
        if (O.mM3.x.length === 2 && O.mM8.x !== 0) {
          updateCalc();
        }
      };
    }).startWith([0,0,0,0]);

    const opClick$ = sources.DOM
      .select('.op').events('click');
  
    const opClickAction$ = opClick$.map(e => {
      mM8.ret(e.target.textContent);
      if (O.mM3.x.length === 2) {
        updateCalc();
      }
    })

    const mM$1Action$ = mM$1.stream.map(v => {
      if (Array.isArray(v)) {
        O.mMhistorymM1.bnd(spliceAdd, O.mMindex2.x, v, O.mMhistorymM1);
        document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
        document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
        document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
        document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
        cleanup()
      }
      else {
        console.log('O.mM$1.stream is providing defective data to O.mM$1Action');
      }
  });  `  )

  const arrayFuncs = h('pre',  `  var push = function push(y,v,mon) {
      if (Array.isArray(y)) {
        let ar = [];
        let keys = Object.keys(y);
        for (let k in keys) {ar[k] = y[k]};
        ar.push(v);
        return mon.ret(ar);  
      }
      console.log('The value provided to push is not an array');
      return ret(y);
    };
    
    var spliceRemove = function splice(x, j, mon) {
      if (Array.isArray(x)) {
        let ar = [];
        let keys = Object.keys(x);
        for (let k in keys) {ar[k] = x[k]};
        ar.splice(j,1);
        return mon.ret(ar);  
      }
      console.log('The value provided to spliceRemove is not an array');
      return ret(x);
    };
    
    var spliceAdd = function splice(x, index, value, mon) {
      if (Array.isArray(x)) {
        let ar = [];
        let keys = Object.keys(x);
        for (let k in keys) {ar[k] = x[k]};
        ar.splice(index, 0, value);
        return mon.ret(ar);  
      }
      console.log('The value provided to spliceAdd is not an array');
      return ret(x);
    };
    
    var splice = function splice(x, start, end, mon) {
      if (Array.isArray(x)) {
        let ar = [];
        let keys = Object.keys(x);
        for (let k in keys) {ar[k] = x[k]};
        ar.splice(start, end);
        return mon.ret(ar);  
      }
      console.log('The value provided to spliceAdd is not an array');
      return ret(x);
    };
  `  )

var cleanup = h('pre',  `  function cleanup (x) {
      let target0 = document.getElementById('0');
      let target1 = document.getElementById('1');
      let target2 = document.getElementById('2');
      let target3 = document.getElementById('3');
      let targetAr = [target0, target1, target2, target3];
      for (let i in [0,1,2,3]) {
        if (targetAr[i].innerHTML == 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      }
      return ret(x);
  }; `  )

  var travel = h('pre',  `  const forwardClick$ = sources.DOM
      .select('#forward2').events('click');
  
    const backClick$ = sources.DOM
      .select('#back2').events('click');
  
    const forwardClickAction$ = forwardClick$.map(() => {
      if (O.mMindex2.x < (O.mMhistorymM1.x.length - 1)) {
        inc(O.mMindex2.x, mMindex2)
        .bnd(() => mM$3.ret('Hello'))
      }
    });
  
    const backClickAction$ = backClick$.map(() => {
      if (O.mMindex2.x > 0) {
        dec(O.mMindex2.x, mMindex2)
        .bnd(() => mM$3.ret('You bet!'))
      }
    });

    const mM$3Action$ = mM$3.stream.map(v => {
      document.getElementById('0').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[0]; 
      document.getElementById('1').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[1]; 
      document.getElementById('2').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[2]; 
      document.getElementById('3').innerHTML = (O.mMhistorymM1.x[O.mMindex2.x])[3]; 
      cleanup();
    })  `  )

  var ret = h('pre',  `  var ret = function ret(v) {
    var mon = new Monad(v, 'anonymous');
    return mon;
  }  `  )

  var C42 = h('pre',  `  mMZ10.bnd(() => mM$1
     .ret([O.mMar.x[3], O.mMar.x[4], O.mMar.x[5], O.mMar.x[6]])
     .bnd(() => mM$2.ret([]))
     .bnd(displayInline,'0')
     .bnd(displayInline,'1')
     .bnd(displayInline,'2')
     .bnd(displayInline,'3'));  `  )

  var taskStream = h('pre',  `  
    });  `  )

  var deleteTask2 = h('pre',  `  mMZ19.bnd(() => O.mM$task.bnd(spliceRemove, O.mMar.x[3], mM$task));
  `  )

  var newTask = h('pre',  `  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown'); 

  const newTaskAction$ = newTask$.map(e => {
      let ob = {};
      var alert = '';
      var ar = e.target.value.split(',');
      var ar2 = ar.slice(2);
      var task = '';
      if (ar.length < 4) {
        task = ar[2];
      }
      if (ar.length > 3) {
        task = ar2.reduce((a,b) => a + '$*$*$' + b);
      }
      if( e.keyCode == 13 ) {
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }
        if ( ar.length > 2 ) {
          O.mM$taskList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList);
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        } 
      } 
  });  
                  
  var addString = function addString (x, str, mon) {
    var s = str;
    if (x.length > 4) {
    s = x + ',' + str;
    }
    return mon.ret(s);
  };  ` )

  var process = h('pre',  `  const process = function(str) {
    let a = str.split(",");
    console.log('In process. str and a are: ', str, a);
    if (a == undefined) {
      return;
    };
    if (a.length < 9) {
      return
    };
    let ob = {};
    let ar = a.slice(3)
    let s = ar.reduce((a,b) => a + ',' + b);
    if (mM$taskList.x.length < 5) {
      O.mM$taskList.ret(s);
    }
    let ar2 = [];
    let tempArray = [];
    if (ar.length < 6) {return};
    if ((ar.length % 6) !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    } else {
      let keys = Array(ar.length/6).fill(1);
      keys.map(_ => {
        ar2.push(
          {
            task: convertBack(ar.shift()),
            color: ar.shift(),
            textDecoration: ar.shift(),
            checked: ar.shift() === 'true',
            author: ar.shift(),
            responsible: ar.shift()
          }
        )
      })
      console.log('In process  ar2 is: ', ar2)
      let keys2 = Object.keys(ar2);
      for (let k in keys) {
        tempArray.push(
          h('div.todo',  [
            h('span.task3', {style: {color: ar2[k].color, textDecoration: ar2[k].textDecoration}},
                'Task: ' + ar2[k].task  ),  
            h('br'),
            h('button#edit1', 'Edit'  ),
            h('input#edit2', {props: {type: 'textarea', value: ar2[k].task}, style: {display: 'none'}}  ), 
            h('span#author.tao', 'Author: ' + ar2[k].author  + ' / ' + 'Responsibility: ' + ar2[k].responsible),
            h('br'),
            h('input#cb', {props: {type: 'checkbox', checked: ar2[k].checked}, style: {color: ar2[k].color,
                 textDecoration: ar2[k].textDecoration} } ), 
            h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
            h('button.delete', 'Delete'  ),  
            h('br'),
            h('hr')])
        )
      }
      mMtaskList.ret(tempArray)
    }
  };  `  )

  var colorClick = h('pre',  `  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    let s = O.mM$taskList.x;
    let ar = s.split(',');
    let n = 6 * index + 3;
    let j = 6 * index + 2;
    let k = 6 * index + 1;
    let checked = ar[n];
    if (checked == 'true')  {
      ar[n] = 'false'; 
      ar[k] = 'yellow'; 
      ar[j] = 'none'; 
    }
    else {
      ar[n] = 'true'; 
      ar[k] = 'lightGreen'; 
      ar[j] = 'line-through'; 
    }
    mM$taskList.ret( ar.reduce((a,b) => a + ',' + b) )
  });  
                     
  var getIndex = function getIndex (event_object) {
    var task = event_object.currentTarget.parentNode.innerText;
    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;
    var keys = Object.keys(possibilities);
    for (let k in keys) {
      if (task == possibilities[k].innerText) {
        return k
      }
    }
    console.log('In getIndex. No match');
  }  `  )

  var edit = h('pre',  `  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')
    
  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    if( e.keyCode == 13 ) {
      process2(v, index);
    O.mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  const process2 = function(str, index) {
    let a = O.mM$taskList.x;
    let ar = a.split(',');
    let task = str.split(',').reduce((a,b) => ar + '$*$*$' + b)
    ar[index * 6] = task;
    let s = ar.reduce((a,b) => a + ',' + b);
    mM$taskList.ret(s);
  };

  var getIndex2 = function getIndex2 (e) {
    var elem = e.currentTarget.parentNode.children[0].innerHTML
    var elem2 = e.currentTarget.parentNode.parentNode.childNodes
    var keys = Object.keys(elem2);
    for (let k in keys) {
      if (elem == elem2[k].childNodes[0].innerHTML) {
        return k
      }
      console.log('In getIndex2. No match');
    }
  }  `  )

  var mM$task = h('pre',  `  const taskAction$ = mM$taskList.stream.map(ar => {
    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
        ',' + O.mMname.x.trim() + ',' + '@' + ar);
  });  `  )

  var updateCalc = h('pre',  `  function updateCalc() { 
    O.mM3.bnd(x => mM7
    .ret(calc(x[0], O.mM8.x, x[1]))
    .bnd(result => {if (result == 20) {score(O.mM13.x, 1)}; return O.mM7}) 
    .bnd(result => {if (result == 18) {score(O.mM13.x, 3)}; return O.mM$1}) 
    .bnd(push, O.mM7.x, mM$1)
    .bnd(reset))
  };

  var score = function score(x,j) {
    if ((x + j) == 20) {
      mMgoals.ret(O.mMgoals.x == 2 ? 0 : (O.mMgoals.x + 1)); 
      mM13.ret(0);
      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + -x + ',' + O.mMgoals.x); 
      if (O.mMgoals.x == 0) {
        socket.send('CE#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',nothing ');
      }
      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
      return;
    }
    if ((x + j) % 5 == 0) {
      mMscoreChange.ret(j + 5);  
      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+(j+5)+',' + O.mMgoals.x); 
      mM13.ret(x + j + 5);
      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
      return;
    } 
    socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+j+',' + O.mMgoals.x); 
    mM13.ret(x + j);
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
  };  `  )


  var testZ = h('pre',  `  mMZ1.bnd(v => O.mMt1.bnd(add,v,mMt1)
  .bnd(cube,mMt2)
  .bnd(() => mMt3.ret(O.mMt1.x + ' cubed is ' + O.mMt2.x)))  
  
  mMZ2.bnd(v => cube(v).bnd(w => mMt3.ret(v + ' cubed is ' + w)))  `  )

  var quad = h('pre',  `  var solve = (function solve () {
    mMZ3
    .bnd(a => mMquad1.ret(a + 'x*x')
    .bnd(() => mMquad2.ret('').bnd(mMquad3.ret) // Clear the display.
    .bnd(() => 
    mMZ3
    .bnd(b => mMquad1.ret(a + 'x*x ' + ' + ' + b + 'x')
    .bnd(() =>  
    mMZ3
    .bnd(c => mMquad1
    .ret('Solutions for ' + a + 'x*x ' + ' + ' + b + 'x' + ' + ' + c + ' = 0:')
    .bnd(() => mMquad2.bnd(sol1,a,b,c,mMquad2)
    .bnd(() => mMquad3.bnd(sol2,a,b,c,mMquad3) 
    .bnd(() => solve()    
        )))))))))
  })();

  const quad$ = sources.DOM
    .select('#quad').events('keypress')
  const quadAction$ = quad$.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ3.release(e.target.value)
      document.getElementById('quad').value = '';
    }
  });

  var sol1 = function sol1 (x,a,b,c,mon) {
    let n = b*(-1) + Math.sqrt(b*b - 4*a*c);
    if (n != n) {   // Test for NaN
      return mon.ret("No solution");
    }
    return mon.ret(n/2*a);
  }
  
  var sol2 = function sol2 (x,a,b,c,mon) {
    let n = b*(-1) - Math.sqrt(b*b - 4*a*c)
    if (n != n) {
      return mon.ret("No solution");
    }
    return mon.ret(n/2*a);
  }  `  )

  var p2 = h('pre',  `  
  `  )

  var p1 = h('pre',  `  
  `  )

  var p2 = h('pre',  `  
  `  )

  var p1 = h('pre',  `  
  `  )





export default {monads, fib, driver, messages, next, Monad$, updateCalc, stream, arrayFuncs, travel, nums, cleanup, ret, C42, taskStream, newTask, process, mM$task, addString, colorClick, edit, testZ, quad }
