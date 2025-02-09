import { Router } from "express";
import ProductManager from "../managers/ProductManager";

const router = Router();

router.get("/", async (req, res) => {
    const products = await ProductManager.getProducts();
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const product = await ProductManager.getProductsByid(parseInt(req.params.pid));
    product ? res.json(product) : res.status(404).json({mesage: "Producto no encontrado"});
});

router.post("/", async(req, res) => {
    const  { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: "Todos los campos son obligatorios"})
    }
    const newProduct = await ProductManager.addProducts({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    });
    res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
    await ProductManager.updateProduct(parseInt(req.params.pid));
    res.json({ message: "Producto actualizado"});
});

router.delete("/:pid", async (req,res) => {
    await ProductManager.deleteProduct(parseInt(req.params.pid));
    res.json({ message: "Producto eliminado"});
});

export default router;