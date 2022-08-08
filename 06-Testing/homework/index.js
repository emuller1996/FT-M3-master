const express = require("express");
const app = express();
const {sumArray, pluck} = require('./util');
app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});
app.get("/test", (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post("/product", (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  res.send({ result: a + b });
});

app.post("/sumArray", (req, res) => {
  const {array, num} = req.body;
  var b = sumArray(array,num);
  res.send({ result: b });
});

app.post("/numString", (req, res) => {
  const  {str} = req.body;
  if (typeof str === 'number') res.status(400).send({error : 'el string es un número.'})
  if ( str === '') res.status(400).send({error : 'el string esta vacio.'})
  res.send({ result: str.length });
});

app.post('/pluck', (req, res)=>{
  const {array , key} = req.body;
  if (!Array.isArray(array)) res.status(400).send({error : 'Array no es un arreglo.' })
  if (key ==="") res.status(400).send({error : 'el string propiedad está vacio.'})
  var arrayNew = array.map(o => o[key]);
  return res.json({result : arrayNew});

})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
