"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== "function")
    throw TypeError("executor not is a function");
  this._state = "pending";
  this._value = undefined;
  this._handlerGroups = [];

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._value = data;
    this._state = "fulfilled";
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (data) {
  if (this._state === "pending") {
    this._value = data;
    this._state = "rejected";
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;
  const downstreamPromise = new $Promise(function() {})


  this._handlerGroups.push({
    successCb,
    errorCb,
    downstreamPromise
  });

  if (this._state !== "pending") this._callHandlers();
  return downstreamPromise; // promesa B 
};



$Promise.prototype._callHandlers = function() {
    while(this._handlerGroups.length) {
        let currentHandler = this._handlerGroups.shift(); //{successCB, errrCB}

        //Promesa B
        const downstreamPromise = currentHandler.downstreamPromise;

        if(this._state === 'fulfilled') {
            if(!currentHandler.successCb) {
                //No tenemos successHanlder
                //Resuelvo a B al valor de A
                downstreamPromise._internalResolve(this._value) //promesaA.value
            }
            else {
                //Hay succes Handler
                try {
                    const result = currentHandler.successCb(this._value) // valor / promesa / err

                    //1) SuccessCb retorna una promesa (Z)
                    if(result instanceof $Promise ) {
                        result.then(function(value) {
                            downstreamPromise._internalResolve(value)
                        }, function(err) {
                            downstreamPromise._internalReject(err)
                        })
                    }
                    else {
                        //2) SuccessCb retorna un valor
                        downstreamPromise._internalResolve(result) // un valor
                    }
                } catch (error) {
                    //3) El handler successCb lanzó un error
                    downstreamPromise._internalReject(error)
                }
            }
        }          

        else {
            //Cuando la promesa A se rechace
            if(!currentHandler.errorCb) {
                //Y no tenemos hanlder
                downstreamPromise._internalReject(this._value) //valor de promesa A
            }
            //Tenemos handler
            else {
                try {
                    const result = currentHandler.errorCb(this._value) //promesa | err | valor(err)

                    //1) ErrorCb retorna una promesa(Z)
                    if(result instanceof $Promise ) {
                        result.then(function(value){
                            //Promesa B la resuelvo al valor de Z
                            downstreamPromise._internalResolve(value)
                        }, function(err) {
                            downstreamPromise._internalReject(err)
                        })
                    }
                    else {
                        //2) ErrorCb no devolvia una promesa. Retorna un valor
                        //Promesa B se resuelve al motivo de A
                        downstreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    //3) El handler lanzó un error
                    downstreamPromise._internalReject(error)
                }
            }
        }
    }
}

$Promise.prototype.catch = function(errorCb){
    return this.then(null,errorCb);
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
