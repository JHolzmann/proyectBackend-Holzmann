import fs from "fs";

class CartManager {
    constructor(filePath) {
        this.path = filePath;

    }
    async getCarts() {
        try {
            if(!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer carritos:", error);
            return [];
        }
    }
    async createCart() {
        const carts = await this.getCarts();
        const newCart = {id: carts.length + 1, products: []};
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }
    async getCartByid(id){
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id) || null;
    }
    async addProductToCart( cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(prod => prod.product === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
    }
}

export default new CartManager("./src/data/carts.json");