const { Router } = require('express');
const fs = require('fs/promises'); 
const path = require('path');

const filePath = path.resolve(__dirname, '../../productos.json'); 
console.log(filePath); 

const rutaProd = Router()

rutaProd.get('/', async (req, res) => { 
	const fileData = await fs.readFile(filePath, 'utf-8');
	const productos = JSON.parse(fileData);
	res.json({ 
		data: productos,
	});
});

rutaProd.get('/:id', async (req, res) => {
	const id = req.params.id 
	const fileData = await fs.readFile(filePath, 'utf-8'); 
	const productos = JSON.parse(fileData); 

	const indice = productos.findIndex(unUsuario => unUsuario.id == id); 

	if(indice < 0){ 
		return res.status(404).json({
			msg: "Producto innexistente"
		})
	}

	res.json({ 
		msg: `devolviendo el producto con id ${id}`,
		data: productos[indice]
	});
});


rutaProd.post('/', async (req, res) => { 
	const data = req.body; 
	console.log(req.body); 

	const { title, price } = req.body;

	if(!title || !price) { 
		return res.status(400).json({
			msg: "Campos invalidos :( "
		})
	}

   
    const fileData = await fs.readFile(filePath, 'utf-8');
    const productos = JSON.parse(fileData); 

	const nuevoProd = { 
        id: productos.length + 1, 
		title,
        price
	}

	productos.push(nuevoProd); 

	await fs.writeFile(filePath, JSON.stringify(productos, null, '\t')); 

	res.json({ 
		msg: 'ok',
		data: nuevoProd
	})
});

rutaProd.put('/:id', async (req, res) => { 
	const id = req.params.id; 
	const {title, price} = req.body; 

	const fileData = await fs.readFile(filePath, 'utf-8');
	const productos = JSON.parse(fileData);

	const indice = productos.findIndex(unProd => unProd.id == id);

	if(indice < 0){
		return res.status(404).json({
			msg: "Producto innexistente"
		})
	}

	if(!title || !price ) { 
		return res.status(400).json({
			msg: "Campos invalidos :( "
		})
	}

	const prodActualizado = {
		id: productos[indice].id,
		title,
		price
	}

	productos.splice(indice, 1, prodActualizado); 

	await fs.writeFile(filePath, JSON.stringify(productos, null, '\t'));

	
	res.json({ 
		msg: `Modificando objet con id ${id}`,
		data: prodActualizado,
	})
});

rutaProd.delete('/:id', async (req, res) => {
	const id = req.params.id; 
	const fileData = await fs.readFile(filePath, 'utf-8');
	const productos = JSON.parse(fileData);

	const indice = productos.findIndex(unProd => unProd.id == id);

	if(indice < 0){ 
		return res.json({
			msg: "producto no existente"
		})
	}

	productos.splice(indice, 1); 
	await fs.writeFile(filePath, JSON.stringify(productos, null, '\t'));

	
	res.json({ 
		msg: `Producto con id ${id} ha sido eliminado`,
	})
})

module.exports= rutaProd;