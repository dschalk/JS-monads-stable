#JS-monads-stable 
This is the repository for a [Motorcycle.js](https://github.com/motorcyclejs) application running online at [JS-monads-stable](http://schalk.net:3055). Motorcycle.js is essentially [Cycle.js](https://github.com/cyclejs/core) using [Most](https://github.com/cujojs/most) and [Snabbdom](https://github.com/paldepind/snabbdom) instead of RxJS and virtual-dom.

Motorcycle is an ideal host for my JS-monads project, which is an exposition of functional programming using instances of convenient constructs named "Monad", "MonadState", "MonadSet", and "MonadItter".
The server is a modified clone of the Haskell Wai Websockets server. Haskell pattern matching and list comprehension made it easy to configure the server to broadcast selectively to members of groups, who share the dice game, todo list, and chat room. I use Babel and Webpack to prepare the front end and Stack to compile everything into a single executable which I upload to my Digital Ocean "droplet". 

The code here is not annotated, but detailed examinations of the code behind the multiplayer simulated dice game, persistent todo list, chat feature, and several other demonstrations can be found at [http://schalk.net:3055](http://schalk.net:3055), where the code is running online. 
## Basic Monad    
```javascript    
    function Monad (z, ID = 'default') {
        var x = z;
        var ob = {
        id: ID,
        bnd: function (func, ...args) {
          return func(x, ...args)
        },
        ret: function (a) {
          return window[ob.id] = new Monad(a, ob.id);
        }
      };
      return ob
    };
    
    function get (m) {    // Getter for the x attribute, which is not exposed.
      let v = m.bnd(x => x);
      return v;
    }  
```
In most chains of computations, the arguments provided to each link's bnd() method are functions that return instances of Monad. The stand-alone ret() function does only one thing; it creates new Monad instances. Here are some examples of functions that return instances of Monad:
```javascript
    function ret(v, id = 'default') {
      return new Monad(v, id);
    } 

    var add = function add (x, b) {
        return ret(parseInt(x,10) + parseInt(b,10) );
    };
    
    var cube = function cube (v, id = 'default') {
        return ret(v * v * v, id);
    };
  
    function log(x, message) {     // message is an array
        console.log(message.join(', '));
        return ret(x);
    };  
```
These functions can be used with instances of Monad in many ways, for example:
```javascript
  ret(3,'cow').bnd(x => log(x,['Received the value ' + x])
  .bnd(cube).bnd(y => log(y, [x + ' cubed is ' + y])
  .bnd(log,['The monad cow holds the value ' + get(cow)])))  

   Output:
   Received the value 3
   3 cubed is 27  
   The monad cow holds the value 3  
```
In the following discussion, "x == y" signifies that x == y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad m with references matching their ids; that is, with m[id] == m.id. M is defined as the collection of all such instances of Monad along and all of the functions in F. We speculate that there is a one to one correspondence between monads in Hask (The For any m (with id == "m"), f, and f' in M, J, F, and F, respectively, the following relationships hold:
```javascript
Left Identity

  equals( m.ret(v).bnd(f), f(v) )   
  equals( ret(v).bnd(f), f(v) ) 
  Examples: equals( m.ret(3).bnd(cube), cube(3) )  Tested and verified  
            equals( ret(3).bnd(cube), cube(3)      Tested and verified
  Haskell monad law: (return x) >>= f ≡ f x  

Right Identity

  m.bnd(m.ret) === m      Tested and verified 
  m.bnd(ret, "m") === m   Tested and verified
  equals(m.bnd(m.ret), m)   Tested and verified
  Haskell monad law: m >>= return ≡ m 

Commutivity

  equals( m.bnd(f1).bnd(f2), m.bnd(v => f1(v).bnd(f2)) ) 
  Example: equals( m.ret(0).bnd(add, 3).bnd(cube), 
           m.ret(0).bnd(v => add(v,3).bnd(cube)) )  Tested amd verified
  Haskell monad law: (m >>= f) >>= g ≡ m >>= ( \x -> (f x >>= g) ) 
```
where equals is defined as:
```javascript
    var equals = function equals (mon1, mon2) {
      if (mon1.id === mon2.id && get(mon1) === get(mon2)) return true;
      else return false
    }  
```
The function equals() was used because the == and === operators on objects check for location in memory, not equality of attributes and equivalence of methods. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory and the == operator returns false. So we expect m.ret(3) == m.ret(3) to return false. What concerns us is the equivalence of both sides of a comparison; that is, can the left side be substituted for the right side and vice versa.

Tests in the JS-monads-mutableInstances branch at the Github repository produce results closer to what we would expect in mathematics. For example: m.ret(7) == m.ret(7) returns true in JS-monads-mutableIntances but false in JS-monads-stable, the master branch. But it would be folly to give up immutability for the sake of making unimportant comparisons come out "right". equals(m.ret(7), m.ret(7)) tells us that m.ret(7) will yield a result that performs consistenly any time it is executed. and that is all that is important. Similarly, equals(ret(3).bnd(cube), cube(3)) tells us that ret(3).bnd(cube) and cube(3) yield results that will perform identically, so they can be substituted for one another.

In Haskell, x ≡ y means that you can replace x with y and vice-versa, and the behaviour of your program will not change. That is what "equals(x, y)" means in the context of demonstrating that instances of Monad in M obey the Javascript equivalent of the Haskell monad laws. The Monad ret() (the function and the method) and bnd() methods provide functionality similar to the Haskell monad return function and >>= operator. 

Haskell monads are not category theory monads. To begin with, they don't even reside in a category. See: http://math.andrej.com/2016/08/06/hask-is-not-a-category. Nevertheless, blogs abound perpetuating the Haskell mystique that, as one blogger wrote, "There exists a "Haskell category", of which the objects are Haskell types, and the morphisms from types a to b are Haskell functions of type a -> b." The nLab wiki page states "There is a category, Hask, whose objects are Haskell types and whose morphisms are extensionally identified Haskell functions.", and the first line of the Haskell Wiki https://wiki.haskell.org/Hask states "Hask is the category of Haskell types and functions." but at least it goes on to demonstrate that Hask is not a category theory category.

It is true that Haskell monads obey rules that are Haskell translations of the structure-preserving rules about functors and natural transformations in the category-theoretic monad. I have demonstrated that the elements of M (defined above) obey a Javascript version of these same rules. This suggests that instances of Monad can be expected to be versitile and robust in production. The smoothly functioning game and todo list, along with the demonstratons that appear later on this page, reinforce this expectation.
##MonadItter

MonadItter instances do not have monadic properties, but they facilitate the work of monads. Here's how they work:

For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p == func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. Here is the definition:
```javascript
const MonadItter = function ()  {
  this.p = function () {};
  this.release = (...args) => this.p(...args);
  this.bnd = func => this.p = func;
};
```
As shown later in the online demonstration, MonadItter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. In one of the demonstrations, they behave much like ES2015 iterators. I prefer them over ES2015 iterators. They can also help to provide promises-like functionality without promises.

###Traversal of the dice game history.

MonadState instance travMonad facilitates traversal of the game history. travMonad.s is a four member array holding the current numbers, current score, current goals, and an array of arrays containing numbers, score, and goals corresponding to past states of the game.. Here is the definition of travMonad and its auxiliary function:
```javascript
  var travMonad = new MonadState("travMonad", [[8,8,8,8], 0, 0, [ [ [], 0, 0 ] ] ], trav_state)
  
  function trav_state (ar) {
    pMindex.bnd(add,1).bnd(pMindex.ret);
    var nums = ar[0];
    var score = ar[1];
    var goals = ar[2];
    var next = travMonad.s.slice();
    var ar = [nums, score, goals];
    next[0] = nums;
    next[1] = score;
    next[2] = goals;
    next[3].unshift(ar);
    return next;         // This results in travMonad.s == next.
  }
```  
The number display is generated by four virtual button nodes with id = i, st yle: {display: get(pMstyle)[i]} and text get(pMnums)[i] for i = 0, 1, 2, and 3. The virtual button nodes rest permanently in the virtual DOM. pMnums and pMstyle are updated in the messages$ stream whenever a new dice roll is received from the server. pMnums and pMstyle are also re-set when a user clicks a number, causing it to disappear from the display and when when a user clicks a number or an operator button prompting a call to updateCalc, which either causes a new roll or a computed number to be added to the display. numClickAction$ and opClickAction$ are merged into the stream that feeds the virtual DOM, so updates are seen almost instantaneously.

Whenever pMnums changes, the expression pMnums.bnd(test3).bnd(pMstyle.ret) updates pMstyle so as to hide undefined values of get(pMnumes)[i] for i = 0, 1, 2, and 3.
```javascript
  function test3 (a) {
    var b = [];
    for (let i of [0,1,2,3]) {
      b[i] = (a[i] == undefined) ? 'none' : 'inline'
    }
    return ret(b);
  }  

  pMnums.bnd(test3).bnd(pMstyle.ret);  
```  
New dice rolls always correspond to score changes. One point is lost each time a player clicke ROLL. Scores increase whenever players put together expressions that return 18 or 20. An increase in score is always accompanied by a call to newRoll() with two arguments: score and goals. The server updates its ServerState TMVar and broadcasts the new roll to all group members with the prefix "CA#$42. The server also broadcasts the updated score and goal information, with the prefix NN#$42. These messages are caught, parsed, and acted upon in the message$ stream in the Motorcycle front end. pMnums, pMstyle, and travMonad get updated during the course of this process.
```javascript
  mMZ10.bnd( () => {
    pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)
    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);
    pMscore.ret(v[7]);
    pMgoals.ret(v[8]) });  
```
###Updating the numbers

The previous discusion was about traversal of the game history. This seems like a good place to look at the algorithm for generating new numbers when players click on the number and operator buttons. Here is the code:
```javascript
  var numClick$ = sources.DOM
      .select('.num').events('click'); 

  var numClickAction$ = numClick$.map(e => {
    if (get(mM3).length == 2) {return};
    pMnums    
    .bnd(spliceM, e.target.id, 1)
    .bnd(pMnums.ret)
    .bnd(test3)
    .bnd(pMstyle.ret)
    mM3
    .bnd(push, e.target.innerHTML)
    .bnd(mM3.ret)
    .bnd(v => {
      if (v.length == 2 && get(mM8) != 0) {
        updateCalc(v, get(mM8)) 
      }
    })
    }).startWith([0, 0, 0, 0]);

  var opClick$ = sources.DOM
      .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    mM8.ret(e.target.innerHTML).bnd(v => { 
      var ar = get(mM3)
      if (ar.length === 2) {
        updateCalc(ar, v)
      }
    }) 
  });
```
The clicked number is removed from pMnums and added to mM3 in the numClickAction$ stream. If two numbers and an operator have been selected, numClickAction$ and opClickAction$ call updateCalc, giving it the two member array (which is held in mM3) of selected numbers and the selected operator. After each roll, mM8 is given the value 0 so get(mM8) != 0 means an operator has been selected. 
```javascript
  function updateCalc(ar, op) {
    var result = calc(ar[0], op, ar[1]);
    mM3.ret([]);
    mM8.ret(0)
    if (result == 20) { 
      pMscore.bnd(add,1)
      .bnd(testscore)
      .bnd(pMscore.ret)
      .bnd(v => score(v));
      return; 
    } 
    else if (result == 18) { 
      pMscore.bnd(add,3)
      .bnd(testscore)
      .bnd(pMscore.ret)
      .bnd(v => score(v));
      return; 
    }
    else {
      pMnums.bnd(push,result)
      .bnd(pMnums.ret)
      .bnd(v => {
        travMonad.run([v, get(pMscore), get(pMgoals)])
        test3(v)
        .bnd(pMstyle.ret)
      }); 
      mM8.ret(0);
      mM3.ret([]);
      console.log('in updateCalc 1111111111 get(pMnums), get(pMstyle) ', get(pMnums), get(pMstyle) );
    }
  };  

  var testscore = function testscore(v) {
    if ((v % 5) === 0) return ret(v+5)
    else return ret(v);
  };

  function score(scor) {
    if (scor != 25) {
      newRoll(scor, get(pMgoals))
    }
    else if (get(pMgoals) == 2) {
      newRoll(0,0)
    }
    else {pMgoals.bnd(add, 1).bnd(pMgoals.ret).bnd(g => newRoll(0, g))};
  };  

```  
updateCalc calls calc on the numbers and operater given to it by numCalcAction$ or opCalcAction$, giving the value to a variable named "result". If the value of result is 18 or 20, the resulting score is checked to see if it should be augmented by five and then score(scor) is called, providing the new score to the function score(). score() performs some more tests and calls for a new roll with the values of score and goals it has determined depending on whether or not there is a score and, if so, a winner.
##MonadSet
The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers
```javascript
  var MonadSet = function MonadSet(set, ID) {
    var _this = this;
  
    this.s = set;
  
    if (arguments.length === 1) this.id = 'anonymous';
    else this.id = ID;
  
    this.bnd = function (func, ...args) {
       return func(_this.x, ...args);
    };
  
    this.add = function (a) {
      var ar = Array.from(_this.s);
      set = new Set(ar);
      set.add(a);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  
    this.delete = function (a) {
      var ar = Array.from(_this.s);
      set = new Set(ar);
      set.delete(a);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  
    this.clear = function () {
      set = new Set([]);
      window[_this.id] = new MonadSet(set, _this.id);
      return window[_this.id];
    };
  };
  
  var s = new Set();
  
  var sMplayers = new MonadSet( s, 'sMplayers' )  
```
##Websocket messages

Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.

The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.
```javascript
  const messages$ = (sources.WS).map( e => {
  mMtem.ret(e.data.split(',')).bnd( v => {
  console.log('<><><><><><><><><><><><><><><><>  INCOMING  <><><><><><><> >>> In messages. e amd v are ', e, v);
  mMZ10.bnd( () => {
    pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)
    travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);
    pMscore.ret(v[7]);
    pMgoals.ret(v[8]) }); 
  mMZ12.bnd( () => mM6.ret(v[2] + ' successfully logged in.'));
  mMZ13.bnd( () => updateMessages(e.data));
  mMZ14.bnd( () => mMgoals2.ret('The winner is ' + v[2]));
  mMZ15.bnd( () => {
    mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.')
    refresh() });
  mMZ17.bnd( () => testTask(v[2], v[3], e.data) ); 
    mMZ18.bnd( () => {if (get(pMgroup) != 'solo' || get(pMname) == v[2]) {updatePlayers(e.data) } });
  })       
  mMtemp.ret(e.data.split(',')[0])
  .bnd(cow, 'CA#$42', mMZ10)
  .bnd(cow, 'CD#$42', mMZ13)
  .bnd(cow, 'CE#$42', mMZ14)
  .bnd(cow, 'EE#$42', mMZ15)
  .bnd(cow, 'DD#$42', mMZ17)
  .bnd(cow, 'NN#$42', mMZ18)
  });
```  
The "mMZ" prefix designates instances of MonadItter. An instance's bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad's value matches the specified value in the expression. In the messages$ stream, the MonadItter instance's bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example:

The clicked number is removed from pMnums and added to mM3 in the numClickAction$ stream. If two numbers and an operator have been selected, numClickAction$ and opClickAction$ call updateCalc, giving it the two member array (which is held in mM3) of selected numbers and the selected operator. After each roll, mM8 is given the value 0 so get(mM8) != 0 means an operator has been selected. updateCalc calls calc on the numbers and operater given to it by numCalcAction$ or opCalcAction$, giving the value to a variable named "result". If the value of result is 18 or 20, the resulting score is checked to see if it should be augmented by five and then score(scor) is called, providing the new score to the function score(). score() performs some more tests and calls for a new roll with the values of score and goals it has determined depending on whether or not there is a score and, if so, a winner.
```
##[The Online Demonstration](http://schalk.net:3055)
The online demonstration features a game with a traversible dice-roll history; group chat rooms; and a persistent, multi-user todo list. People in the same group share the game, chat messages, and whatever todo list they might have. Updating, adding, removing, or checking "Complete" by any member causes every member 's todo list to update. The Haskell websockets server preserves a unique text file for each group's todo list. Restarting the server does not affect the lists. Restarting or refreshing the browser window causes the list display to disappear, but signing in and re-joining the old group brings it back. If the final task is removed, the server deletes the group's todo text file. 

With Motorcycle.js, the application runs smoothly and is easy to understand and maintain. I say "easy to understand", but for people coming from an imperitive programming background, some effort must first be invested into getting used to functions that take functions as arguments, which are at the heart of Motorcycle and JS-monads-stable. After that, seeing how the monads work is a matter of contemplating their definitions and experimenting a little. Most of the monads and the functions they use in this demonstration are readily available in the browser console. If you have the right dev tools in Chrome or Firefox, just load [http://schalk.net:3055](http://schalk.net:3055) and press F12. You might need to enter Ctrl-R to re-load with access to the monad.js script. I do this to troubleshoot and experiment. 

.
.

