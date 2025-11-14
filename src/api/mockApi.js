//This is temporary mock API data for development purposes
export const mockProducts = [
    {
   sku: "123456",
   name: "Product A",
   price: 29.99,
   qty: 100,
   description: "Description for Product A",
   image: "./images/product1.webp"
    },
    {
    sku: "789012",
    name: "Product B",
    price: 49.99,
    qty: 50,
    description: "Description for Product B",
    image: "./images/product2.webp"
    },
    {
    sku: "345678",
    name: "Product C",
    price: 19.99,
    qty: 200,
    description: "Description for Product C",
    image: "./images/product3.webp"
    }
];

//simulate fetching products from an API
export function getProducts() {
    return Promise.resolve(mockProducts);
}

//simulate fetching a single product by SKU
export function getProductBySku(sku) {
    const product = mockProducts.find(p => p.sku === sku);
    return Promise.resolve(product);
}
//simulate post / orders
export function createOrderMock(payload) {
    console.log("Order created with payload:", payload);
    return Promise.resolve({ success: true, orderId: "ORD123456" })
}    
