const express = require('express')
const fs = require('fs')
const app = express();
const puerto = 8080;
const myJson ='productos.json'




class Contenedor{
  constructor(nameArchivo){
    this.nameArchivo=nameArchivo;

  }
  async obtenerJson(){
    const data = await  fs.promises.readFile(myJson,'utf-8') 
 return JSON.parse(data); 
  }
  async guardarJson(){
    const dato = JSON.stringify(productos, null, '\t')
	await fs.promises.writeFile(myJson, dato)
  }
  async getAll(){
    const productos = await this.obtenerJson();
    return productos;
  }
   async getById(id){
    const productos = await this.obtenerJson();
    
    const findId = productos.findIndex((producto)=>producto.id === id);
    if(findId < 0){
        throw new Error('Producto no Encontrado')
    }
    return  productos[findId]
}
 async save(data){
    if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos invalidos');
    
    const productos = await this.obtenerJson();
    let id = 1;
    if (productos.length){
        id = productos[productos.length -1].id +1
    }
    const nuevoProducto = {
		title: data.title,
		price: data.price,
		id: id
	}

	productos.push(nuevoProducto);

	await guardarProduts(productos)
        
    }

   async deleteAll(){
        await guardarProduts([]);

    }
     async deleteById  (id){
        const productos =  await this.obtenerJson();
        const findId = productos.findIndex((producto)=>producto.id === id)
        if(findId < 0){
            return;
        }
        productos.splice(findId,1)


        await guardarProduts(productos)

 }
}



const server = app.listen(puerto, () =>
  console.log("Server preparado en puerto", puerto)
);

server.on("error", (error) => {
  console.log("Error en el servidor!", error);
});
  
const contenedor = new Contenedor(myJson);    

let visitas=0;
app.get('/',(req,res)=>{
  visitas++
  res.send(`Bienvenido al Sercidor sos el visitante Numero:${visitas}`)
});

app.get('/productos',async(req, res)=>{
  const products= await contenedor.getAll()
  const vistaProd= products.map((product)=>{
    return `Producto:${product.title} Price:${product.price} id:${product.id} `
  })
  res.send(vistaProd)
});

const itemRandom = (min,max)=>{
  return Math.floor(Math.random()*(max - min) +min);
};

app.get('/productoRandom', async(req, res)=>{
  const id = itemRandom(1,4)
  const product = await contenedor.getById(id)
  const showProduct = `Producto: ${product.title} - Precio: ${product.price} - ID: ${product.id}`
  res.send(showProduct)
});




