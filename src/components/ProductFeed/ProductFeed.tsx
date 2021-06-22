import styles from "./ProductFeed.module.css";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/app-interfaces";
import { ReactComponent as EditButton } from "../../assets/edit-round-line.svg";
import { fetchProducts } from "../../utils/fetchUtils";
import ProductDetails from "../../components/ProductDetails/ProductDetails";

export default function ProductFeed() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [currentProductIndex, setIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const products = await fetchProducts();
      setProducts(products);
      const categories = new Set<string>();
      for (const product of products) {
        if (product.category) categories.add(product.category);
      }
      setCategories(Array.from(categories));
    })();
  }, []);

  function closeModal() {
    setIsOpen(false);
    setProductDetails(null);
  }

  function openModal(index: number) {
    setIndex(index);
    setProductDetails(products[index]);
    setIsOpen(true);
  }

  return (
    <div className={styles.ProductFeed} data-testid="ProductFeed">
      {products.map((product: Product, i: number) => {
        return (
          <div className={styles.gridItem} key={i} data-testid="Product">
            <h4>{product.name || "Name is empty"}</h4>
            <div>{product.price ? `€${product.price}` : ""}</div>
            <div className={styles.Category}>{product.category}</div>
            <div>
              {product.image && <img src={product.image} alt={product.name} />}
              {product.description || "Description is empty"}
            </div>
            <button
              className={styles.editButton}
              title="Edit"
              onClick={() => openModal(i)}
            >
              <EditButton />
            </button>
          </div>
        );
      })}
      {productDetails && (
        <ProductDetails
          product={productDetails}
          categories={categories}
          show={modalIsOpen}
          onHide={closeModal}
          onSave={(updatedProduct) => {
            setProducts(
              products.map((product, i) =>
                i === currentProductIndex ? updatedProduct : product
              )
            );
            setProductDetails(null);
          }}
        />
      )}
    </div>
  );
}
