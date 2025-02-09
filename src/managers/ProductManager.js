import fs, { writeFile } from "fs";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }
    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("error al leer productos:", error);
            return [];
        }
    }
    async getProductsByid(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id) || null;
    }
    async addProducts(product) {
        const products = await this.getProducts();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 :1;
        const newProduct = {id: newId, ...product};
        products.push(newProduct);
        await fs.promises,writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }
    async updateProduct(id, updatedFields) {
        let prducts =await this.getProducts();
        products = products.filter(prod => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
};

export default new ProductManager("./src/data/products.json");