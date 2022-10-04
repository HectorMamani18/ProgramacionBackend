const fs = require('fs')

const myJson ='Archivo.json'

const productosJson= async()=>{
 const data = await  fs.promises.readFile(myJson,'utf-8') 
 return JSON.parse(data);  
}
const guardarProduts = async (productos) => {
	const dato = JSON.stringify(productos, null, '\t')
	await fs.promises.writeFile(myJson, dato)
};

const getAll = async()=>{
    const productos = await productosJson();
    return productos;
}

const getById = async(id)=>{
    const productos = await productosJson();
    
    const findId = productos.findIndex((producto)=>producto.id === id);
    if(findId < 0){
        throw new Error('Producto no Encontrado')
    }
    return  productos[findId]
}
 const save = async (data)=>{
    if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos invalidos');
    
    const productos = await productosJson();
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

    const deleteAll = async ()=>{
        await guardarProduts([]);

    }
    const deleteById = async (id)=>{
        const productos = await productosJson();
        const findId = productos.findIndex((producto)=>producto.id === id)
        if(findId < 0){
            return;
        }
        productos.splice(findId,1)


        await guardarProduts(productos)

 }
 




                              //Llamado a getAll//

//getAll().then((data)=>{console.log(data)}) 



                              //Llamado a getById//
/* const productoid=async ()=>{
    const data = await getById(2);
    console.log(data)
}                              
 productoid(1);  */                            
                              
                              //Llamado a save//
 /* const guardar =async ()=>{
    await save({
        title: "Estilo Tradicional",
        price: 1500,     
        id: 4
    });} 
 guardar();   */    
 
                     //Llamado a deleteById y deleteAll/
//deleteAll()                  
//deleteById(3)                    