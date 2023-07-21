const { Pool } = require("pg")

const pool = new Pool({
    host:'localhost',
    user: 'postgres',
    password:'amapola',
    database:'likeme',
    allowExitOnIdle: true
})

const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
};

const agregarPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion,likes];
    const result = await pool.query(consulta, values);
    console.log("Película Agregada");
};

//Parte 2 del desafío

// modificar 
    const modificarPost = async (titulo, id) => {
    const consulta = "UPDATE posts SET titulo = $1 WHERE id = $2";
    const values = [titulo, id];
    const result = await pool.query(consulta, values);
    const { rowCount } = await pool.query(consulta, values);
    if (rowCount === 0) {
      throw { code: 404, message: "Error al modificar" }
    }
  }
  
  // eliminar 
  const deletePost = async (id) =>{
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    return result.rows;
  }
   

module.exports = {
    getPosts,
    agregarPost,
    modificarPost,
    deletePost
}