class   Usuarios {
    constructor(nombre,apellidos,libros,mascotas){
    this.nombre=nombre
    this.apellidos=apellidos
    this.libros=libros
    this.mascotas=mascotas
    }
    getFullName() {
        console.log( `El Nombre de usuario es: ${this.nombre} ${this.apellidos}`)
   }
  
    addMascotas(nuevaMascota){
       this.mascotas.push(nuevaMascota)
       
    }

    countMascotas(){
    console.log(`Cantidad de Mascotas es:${this.mascotas.length}`)
    }
    
    addBook(nombre,autor){
        this.libros.push({
            nombre: nombre,
            autor:autor
        });
    }
    getBookNames(){
        let bookName=[]
        this.libros.forEach((libro)=>bookName.push(libro.nombre));
        return bookName;
      
    }
    nombresIte(nombreLibros) {
        nombreLibros.forEach((nombre) => {
          console.log(`Libros de Horror en Coleccion: ${nombre}`);
        });
      }
    
};


const usuario = new Usuarios(
    "Hector",
    "Mamani",
    [
        {nombre: "It", autor:"Stephen King"},
        {nombre: "Carrie", autor:"Stephen King"}
    ],
    ["perro","gato"]
);
usuario.getFullName();
usuario.addMascotas("Conejo");
usuario.countMascotas();
usuario.addBook("Misery","Stephen King")
let bookName= usuario.getBookNames()
usuario.nombresIte(bookName)
