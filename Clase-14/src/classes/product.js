import fs from "fs";
import moment from "moment";

class Product {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async validateExistFile() {
    try {
      await fs.promises.stat(this.fileName);
      return true;
    } catch (error) {
      console.log("El archivo no existe! Creandolo...");
      await fs.promises.writeFile(this.fileName, JSON.stringify([]));
      return false;
    }
  }

  async loadEmptyFile() {
    try {
      let productsDefault = [
        {
          id: 1,
          timestamp: "04-11-22 18:34:30",
          title: "Saco largo",
          description: "Saco largo",
          code: "x",
          photo:
            "https://raw.githubusercontent.com/HectorMamani18/mytiendamamani/master/public/img/9c213c12dfe2d92aeda21d5e5d6dc127--hombre-casual-look.jpg",
          value: 10.1,
          stock: 10,
        },
        {
          id: 2,
          timestamp: "04-11-22 18:34:35",
          title: "Traje gris",
          description: "Traje gris",
          code: "z",
          photo:
            "https://media.gq.com.mx/photos/627ab19b98ce0267fa610a5d/2:3/w_1332,h_1998,c_limit/trajes-para-hombre-colores-para-demostrar-seguridad-y-exito-gris.jpg",
          value: 20.2,
          stock: 20,
        },
       
      ];
      const data = JSON.stringify(productsDefault, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo cargar los productos por defecto!", error);
    }
  }

  async getAll() {
    try {
      let fileExist = await this.validateExistFile();
      if (!fileExist) {
        await this.loadEmptyFile();
      }
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No se pudo obtener los productos!", error);
    }
  }

  async updateProduct(id, body) {
    const products = await this.getAll();
    let flagUpdate = false;

    try {
      products.forEach((product) => {
        if (product.id === id) {
          product.timestamp = moment().format("DD-MM-YYYY HH:MM:SS");
          product.title = body.title ? body.title : product.title;
          product.description = body.description;
          product.code = body.code;
          product.photo = body.photo;
          product.value = body.value;
          product.stock = body.stock;
          flagUpdate = true;
        }
      });
      if (flagUpdate) {
        await this.saveProducts(products);
      } else {
        throw "No existe el producto solicitado!";
      }
    } catch (error) {
      throw error;
    }
  }

  async saveProducts(products) {
    try {
      const data = JSON.stringify(products, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo guardar los productos!", error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const index = products.findIndex((product) => product.id === id);
      if (index < 0) {
        const productExists = {
          index: index,
          msg: "El producto buscado no existe!",
        };
        throw productExists;
      }
      return products[index];
    } catch (error) {
      throw error;
    }
  }

  async saveProduct(data) {
    if (
      !data.title ||
      !data.description ||
      !data.code ||
      !data.photo ||
      !data.value ||
      !data.stock ||
      typeof data.title !== "string" ||
      typeof data.description !== "string" ||
      typeof data.code !== "string" ||
      typeof data.photo !== "string" ||
      typeof data.value !== "number" ||
      typeof data.stock !== "number"
    )
      throw "Datos inválidos!";

    try {
      const products = await this.getAll();
      let id = 1;
      if (products.length) {
        id = products[products.length - 1].id + 1;
      }

      const newProduct = {
        id: id,
        timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
        title: data.title,
        description: data.description,
        code: data.code,
        photo: data.photo,
        value: data.value,
        stock: data.stock,
      };

      products.push(newProduct);

      await this.saveProducts(products);
    } catch (error) {
      throw new Error(
        "Hubo un problema al guardar el producto solicitado!",
        error
      );
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();

      const index = products.findIndex((product) => product.id === id);

      if (index < 0) {
        const productExists = {
          index: index,
          msg: "El producto buscado no existe!",
        };
        throw productExists;
      }

      products.splice(index, 1);

      await this.saveProducts(products);
    } catch (error) {
      throw error;
    }
  }
}

export default Product;
