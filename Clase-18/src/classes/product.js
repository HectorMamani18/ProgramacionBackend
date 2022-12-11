class Product {
  constructor(id, title, value, thumbnail) {
    this.id = id || null;
    this.title = title || null;
    this.value = value || null;
    this.thumbnail = thumbnail || null;
  }

  saveProduct(body, prodcutArray) {
    try {
      let id = 1;
      if (prodcutArray.length) {
        id = prodcutArray[prodcutArray.length - 1].id + 1;
      }

      const newProdcut = {
        id: id,
        title: body.title,
        value: body.value,
        thumbnail: body.thumbnail,
      };

      prodcutArray.push(newProdcut);
    } catch (error) {
      throw new Error("Problems during product saving!", error);
    }
  }
}

const productObj = new Product();

const productArray = [
  new Product(
    1,
    "Conjunto a cuadros",
    100,
    "https://raw.githubusercontent.com/HectorMamani18/mytiendamamani/master/public/img/cuadros.jpg"
  ),
  new Product(
    2,
    "Smoking",
    200,
    "https://raw.githubusercontent.com/HectorMamani18/mytiendamamani/master/public/img/Smoking.jpg"
  ),
  new Product(
    3,
    "Saco largo",
    300,
    "https://raw.githubusercontent.com/HectorMamani18/mytiendamamani/master/public/img/9c213c12dfe2d92aeda21d5e5d6dc127--hombre-casual-look.jpg"
  ),
];

module.exports = {
  productObj,
  productArray,
};
