const express = require ('express')
const app = express()
const cors = require ('cors')
const port = 5000
const { getPosts, agregarPost, modificarPost, deletePost } = require('./consultas')

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "../front/public/index.html")
})

app.listen(port, console.log("Servidor Conectado"))


app.get('/posts', async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
 });
    
app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion } = req.body;
    const img = url;
    await agregarPost(titulo, img, descripcion);
    res.json(req.body)
    });

//Parte 2 (se agrega Modificar titulo y Borrar , ademas del try and catch)

//  PUT para modificar título 
app.put("/posts/:id", async (req, res) => {
const { id } = req.params
const { titulo } = req.query
try {
await modificarPost(titulo, id)
res.send("El título ha sido modificado")
} catch ({ code, message }) {
res.status(code).send(message)
}
 });

  //  Borrar Post
app.delete("/posts/:id", async (req, res) => {
const { id } = req.params;
await deletePost(id)
res.send("Post eliminado");
  });