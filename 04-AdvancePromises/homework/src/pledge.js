'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise (executor){
 if(typeof executor !== 'function') throw TypeError('executor not is a function');
 this._state = 'pending';
 this._value = null;

 this._handlerGroups = [];


 this._callHandlers = ()=> {
    while(this._handlerGroups.length){
        var currentHandler = this._handlerGroups.shift();
        if(this._state === 'fulfilled'){
            currentHandler.successCb(this._value);
        }else{
            currentHandler.errorCb(this._value);
        }
    }
 };

 this._internalResolve = (data)=>{
    if(this._state === 'pending')  this._value =data;
    if(this._state != 'rejected') this._state='fulfilled'
    this._callHandlers()
 };

 this._internalReject = (data)=>{
    if(this._state === 'pending')  this._value =data;
    if(this._state != 'fulfilled')  this._state='rejected';
    this._callHandlers()
 };

 this.then = (successCb,errorCb)=>{
    if(typeof successCb ==='function' && typeof errorCb ==='function'){
        this._handlerGroups.push({
            successCb,
            errorCb
        })
    }else{
        this._handlerGroups.push({
            successCb:false,
            errorCb:false
        })
    }
    if (this._state !== 'pending')  this._callHandlers();
 } 
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
