import { useEffect, useState } from "react";

import { getProducts } from "../api/mockApi";
import ProductGrid from "../components/ProductGrid";
//REPLACE with fetchProducts from apiClient.js when backend is ready




const Products = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts().then((data) => setProducts(data));
        }, []);
   return (
        <div className="p-4"> 
            <h2>Products </h2>
            <ProductGrid products={products} />
        </div>
    );
};
export default Products;