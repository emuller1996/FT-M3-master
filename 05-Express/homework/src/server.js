// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
var posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
var id = 0;

server.post("/posts", (req, res) => {
  if (
    req.body.author === undefined ||
    req.body.title === undefined ||
    req.body.contents === undefined
  ) {
    res
      .status(STATUS_USER_ERROR)
      .json({
        error: "No se recibieron los parámetros necesarios para crear el Post",
      });
  }else{

    var json = {
      id: ++id,
      author: req.body.author,
      title: req.body.title,
      contents: req.body.contents,
    };
    posts.push(json);
    res.json(json);

  }

});

server.post("/posts/author/:author", (req, res) => {
  if (
    req.body.contents === undefined ||
    req.body.title === undefined ||
    req.params.author === undefined
  ) {
    res
      .status(STATUS_USER_ERROR)
      .json({
        error: "No se recibieron los parámetros necesarios para crear el Post",
      });
  }
});

server.get("/posts", (req, res) => {
    if(req.query.term !== undefined){
      var  postsFiltrados = posts.filter(p => p.title.includes(req.query.term) || p.contents.includes(req.query.term) );
      res.json(postsFiltrados);
    }else{
      res.json(posts);
    }
});

server.get('/posts/:author' , (req, res)=>{
  if(req.params.author){
    var  postsFiltrados = posts.filter(p => p.author.includes(req.params.author) );     
      if(postsFiltrados.length !==0){
        res.json(postsFiltrados);
      }else{
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
      }
  }else{
    res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
  }
})

server.get('/posts/:author/:title',(req, res)=>{
  if(req.params.author || req.params.title){
    var  postsFiltrados = posts.filter(p => p.author === req.params.author && p.title === req.params.title );  
    if(postsFiltrados.length !==0){
      res.json(postsFiltrados);
    }else{
      res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
  }
})

server.put('/posts', (req, res)=>{
  var postsU;
  var b=false;
  if (
    req.body.title === undefined ||
    req.body.contents === undefined ||
    req.body.id === undefined
  ) {
    res
      .status(STATUS_USER_ERROR)
      .json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
  }else{


    posts.forEach(p => {
      if(p.id === req.body.id ){
        b=true;
          p.contents = req.body.contents;
          p.title = req.body.title;
          postsU = p
      } 
      
      
  })
  }

  if(postsU){
    res.json(postsU);
  }else{
    res.status(STATUS_USER_ERROR).json({error: "No s sse recibieron los parámetros necesarios para modificar el Post"})
  }

})

server.delete('/posts', (req, res)=>{
  const { id } = req.body;

  if(!id) res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});

  const p = posts.find( p => p.id === id);
  if (!p) res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});

  posts = posts.filter(post => post.id !== id);

  res.json({ success: true } );

})

server.delete('/author', (req, res)=>{
  const {author} =  req.body;
  
  if(!author) res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});

  const p =  posts.find(p => p.author === author);
  if(!p) res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});

  var postE = posts.filter(p => p.author === author);

  posts = posts.filter(p => p.author !== author);
  res.json(postE);

});


// TODO: your code to handle requests

module.exports = { posts, server };
