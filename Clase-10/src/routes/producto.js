const express = require("express");
const router = express.Router();
const Producto = require("../clases/Producto");
const { body, validationResult } = require("express-validator");

const arrayProductos = [
  new Producto(
    1,
    "Conjunto a cuadros",
    100,
    "https://raw.githubusercontent.com/HectorMamani18/mytiendamamani/master/public/img/cuadros.jpg"
  ),
  new Producto(
    2,
    "Smoking",
    200,
    "https://raw.githubusercontent.com/HectorMamani18/mytiendamamani/master/public/img/Smoking.jpg"
  ),
  new Producto(
    3,
    "Saco largo",
    300,
    "https://raw.githubusercontent.com/HectorMamani18/mytiendamamani/master/public/img/9c213c12dfe2d92aeda21d5e5d6dc127--hombre-casual-look.jpg"
  ),
];

const productoObj = new Producto();

router.post(
  "/",
  body("titulo").not().isEmpty().isString().trim().escape(),
  body("precio").not().isEmpty().isInt({ min: 1 }),
  body("miniatura").not().isEmpty().isString().trim(),
  (req, res) => {
    try {
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
      }

      const body = req.body;

      let producto = productoObj.saveProduct(body, arrayProductos);
      res.redirect("/");
    } catch (error) {
      return res.status(400).json({
        error: error,
      });
    }
  }
);

router.get("/", (req, res) => {
  let cantidad = arrayProductos.length;
  let hayProductos = cantidad == 0 ? false : true;
  res.render("vistaProductos", { arrayProductos, hayProductos });
});

module.exports = router;
