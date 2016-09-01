  
  /// <reference path="DefinitelyTyped/es6-shim/es6-shim.d.ts" />
  var MonadItter = function ()  {
    this.p = function () {};
    this.release = (...args) => this.p(...args);
    this.bnd = func => this.p = func;
  };

  var MonadState = function (g, state, value, p)  {
    this.id = g;
    this.s = state;
    this.a = value;
    this.process = p;
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.run = st => { 
      let s = this.process(st); 
      let a = s[3];
      window[this.id] = new MonadState(this.id, s, a, this.process);
      return window[this.id];
    }
  }
  
  var s = new Set();
  var MonadSet = function (set, ID = 'anonymous')  {
    this.s = set;
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.add = a => new MonadSet(s.add(a), this.id);
    this.delete = a => new MonadSet(s.delete(a), this.id);
    this.clear = () => new MonadSet(s.clear(), this.id);
  };

  var Monad = function Monad(z, ID = 'anonymous') {
    this.id = ID;
    this.x = z;
    this.bnd = (func, ...args) => func(this.x, ...args);
    this.ret =  a => window[this.id] = new Monad(a,this.id);
  }; 

  class Jonad {
    constructor(x: any, id: string = 'anonymous') {
    }
    x = this.x
    id = this.id
    bnd = (func, ...args) => func(this.x, ...args);
    ret =  a => window[this.id] = new Monad(a,this.id);
  } 


