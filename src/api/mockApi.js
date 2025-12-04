// src/api/mockApi.js

// This now represents the *real* 9 products we sell.
// Images live in public/images, so we reference them as /images/...

export const mockProducts = [
  {
    sku: "2001",
    name: "Black Hoodie",
    price: 59.99,
    qty: 20,  // from inventorycount
    description: "Heavyweight fleece hoodie with a relaxed fit and soft interior.",
    image: "/images/product1.webp",
  },
  {
    sku: "2002",
    name: "Black Logo Tee",
    price: 29.99,
    qty: 30,
    description: "Classic black tee with bold chest logo graphic.",
    image: "/images/product2.webp",
  },
  {
    sku: "2003",
    name: "Black Script Tee",
    price: 32.99,
    qty: 25,
    description: "Minimal black tee featuring vertical script graphic on the front.",
    image: "/images/product3.webp",
  },
  {
    sku: "2004",
    name: "Vertical Bar Tee",
    price: 29.99,
    qty: 18,
    description: "Clean black tee with a single vertical bar design for a modern look.",
    image: "/images/product4.jpeg",
  },
  {
    sku: "2005",
    name: "Sandstone Classic Tee",
    price: 19.99,
    qty: 30,
    description: "Soft sandstone-colored everyday t-shirt with a relaxed fit.",
    image: "/images/product5.jpeg",
  },
  {
    sku: "2006",
    name: "67 Hands Graphic Tee",
    price: 24.99,
    qty: 25,
    description: "Statement tee with large '67' graphic and illustrated hands.",
    image: "/images/product6.jpg",
  },
  {
    sku: "2007",
    name: "BKTSQD Logo Sweatpants",
    price: 34.99,
    qty: 30,
    description: "Black fleece joggers with small BKTSQD logo on the hip.",
    image: "/images/product7.jpeg",
  },
  {
    sku: "2008",
    name: "Grey Essential Sweatpants",
    price: 32.99,
    qty: 25,
    description: "Everyday grey sweatpants with elastic waist and cuffed ankles.",
    image: "/images/product8.jpeg",
  },
  {
    sku: "2009",
    name: "Grey Classic Hoodie",
    price: 49.99,
    qty: 30,
    description: "Midweight grey hoodie with kangaroo pocket and clean silhouette.",
    image: "/images/product9.webp",
  },
];

// simulate fetching products from an API
export function getProducts() {
  return Promise.resolve(mockProducts);
}

// simulate fetching a single product by SKU
export function getProductBySku(sku) {
  const product = mockProducts.find(p => String(p.sku) === String(sku));
  return Promise.resolve(product);
}
export async function getSaleId() {
  const res = await fetch(
    "https://storemanagementsystem-api.onrender.com/get_sale_counter"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch sale ID");
  }

  const text = await res.text();
  return Number(text);   // API returns plain number
}

/* ------------------------------------------
   SUBMIT SALE TO REAL API
------------------------------------------- */
const API_BASE = "https://storemanagementsystem-api.onrender.com";
export async function submitSale(cartItems, paymentMethod) {
  // fetch sale counter
  const resId = await fetch("https://storemanagementsystem-api.onrender.com/get_sale_counter");
  const saleId = Number(await resId.text());

  const payload = {
    timestamp: Date.now(),                     // FIXED: server requires BIGINT
    products: cartItems.map(i => Number(i.sku)),
    total: cartItems.reduce((sum, item) => sum + Number(item.price), 0),
    method: paymentMethod,
    id: saleId,
  };

  console.log("Submitting sale payload:", payload);

  const res = await fetch("https://storemanagementsystem-api.onrender.com/make_sale", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return { saleId, result: await res.text() };
}