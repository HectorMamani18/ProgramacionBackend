import { CartModel } from "../models/cart";
import { formatTimeStamp } from "../utils/format";
import { findLastProductId } from "../utils/utils";
import { validationResult } from "express-validator";
import { ProductsModel } from "../models/product";


export const getProductsInCart = async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          error: "Tiene que enviar un id válido!",
        });
      }
      const id = parseInt(req.params.id);
  
      const cart = await CartModel.findOne({ id: id });
  
      if (!cart) {
        return res.status(404).json({
          mensaje: "Carrito no encontrado!",
        });
      } else {
        return res.status(200).json({
          data: cart,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  };
  
  export const createCart = async (req, res) => {
    try {
      let lastId = await findLastCartId();
      let newId = lastId + 1;
      let id = newId;
      let timestamp = formatTimeStamp();
      let products = [];
  
      await CartModel.create({
        id,
        timestamp,
        products,
      });
  
      return res.status(201).json({
        mensaje: `carrito ${newId} creado con exito`,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  };
  
  export const addProductsToCart = async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          error: "Tiene que enviar un id de carrito válido!",
        });
      }
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }
  
      const cartId = parseInt(req.params.id);
      const productId = parseInt(req.body.id);
  
      let cart = await CartModel.findOne({ id: cartId });
  
      if (!cart) {
        return res.status(404).json({
          mensaje: "Carrito no encontrado!",
        });
      }
  
      let product = await ProductsModel.findOne({ id: productId });
  
      let products = cart.products;
      products.push(product);
  
      if (!product) {
        return res.status(404).json({
          mensaje: "Producto no encontrado!",
        });
      } else {
        const productAddedToCart = await CartModel.findByIdAndUpdate(
          cart._id,
          { products },
          { new: true }
        );
  
        return res.status(201).json({
          mensaje: "producto agregado al carrito con exito",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  };
  
  export const deleteCartById = async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          error: "Tiene que enviar un id válido!",
        });
      }
      const id = parseInt(req.params.id);
      let cart = await CartModel.findOne({ id: id });
  
      if (!cart) {
        return res.status(404).json({
          mensaje: "carrito no encontrado!",
        });
      } else {
        await CartModel.findByIdAndDelete(cart._id);
        return res.status(200).json({
          mensaje: "carrito eliminado con exito",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  };
  
  export const deleteProductInCartById = async (req, res) => {
    try {
      if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
        return res.status(400).json({
          error: "Tiene que enviar parámetros válidos!",
        });
      }
      const cartId = parseInt(req.params.id);
      const productId = parseInt(req.params.id_prod);
  
      let cart = await CartModel.findOne({ id: cartId });
  
      if (!cart) {
        return res.status(404).json({
          mensaje: "Carrito no encontrado!",
        });
      }
  
      let productExists = cart.products.find((item) => item.id == productId);
  
      if (!productExists) {
        return res.status(404).json({
          mensaje: "Producto no encontrado!",
        });
      } else {
        let products = cart.products;
        const filteredProducts = products.filter((item) => item.id !== productId);
        products = filteredProducts;
  
        const productAddedToCart = await CartModel.findByIdAndUpdate(cart._id, {
          products,
        });
  
        return res.status(201).json({
          mensaje: "producto eliminado del carrito con exito",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  }

