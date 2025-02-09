import { Router } from "express";
import CartManager from "../managers/CartManager";

const router = Router();

router.post("/", async (req, res) => {
    const newCart = await CartManager.createCart();
    res.status(201).json(newCart);
});

router.get("/:cid", async (req, res) => {
    const cart = await CartManager.getCartByid(parseInt(req.params.cid));
    cart ? res.json(cart) : res.status(404).json({ message: "Carrito no encontrado" });
});

router.post("/:cid/product/:pid", async (req, res) => {
    const updatedCart = await CartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    updatedCart ? res.jason(updatedCart) : res.status(404).json({ message: "Carrito no encontrado"});

})

export default router; 