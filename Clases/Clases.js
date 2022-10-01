class   Usuarios {
    constructor(nombre,apellidos){
    this.nombre=nombre
    this.apellidos=apellidos
    this.libros=[];
    this.mascotas=[];
    }
    getFullName() {
    return `${this.nombre} ${this.apellidos}`
   }
  
    addMascotas(nuevaMascota){
       this.mascotas.push(nuevaMascota);
       
    }

    countMascotas(){
    return this.mascotas.lentgh;
    }
    
    addBook(nombre,autor){
        const book ={
            nombre: nombre,
            autor:autor
        }
        this.libros.push(book)
          
    }
    getBookNames(){
        let bookName=[]
        this.libros.map((libro)=>bookName.push(libro.nombre));
        return bookName;
      
    }
    
};


const usuario = new Usuarios("Hector","Mamani");

console.log(usuario.getFullName());
usuario.addMascotas("Conejo");
usuario.addMascotas("Perro")
console.log(usuario.countMascotas());
usuario.addBook("Misery","Stephen King")
usuario.addBook("it","Stephen King")
console.log(usuario.getBookNames());

