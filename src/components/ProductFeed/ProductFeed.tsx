import styles from "./ProductFeed.module.css";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/app-interfaces";

export default function ProductFeed() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await (
        await fetch("http://localhost:3000/productdata")
      ).json();
      setProducts(result);
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.ProductFeed} data-testid="ProductFeed">
      {products.map((product: Product, i: number) => {
        return (
          <div className={styles.gridItem} key={i}>
            <h4>{product.name || "Name is empty"}</h4>
            <div>{product.price ? `€${product.price}` : ""}</div>
            <div className={styles.Category}>{product.category}</div>
            <div>
              {product.image && <img src={product.image} alt={product.name} />}
              {product.description || "Description is empty"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
