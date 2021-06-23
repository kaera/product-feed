import styles from "./ProductDetails.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useState } from "react";
import { Product } from "../../interfaces/app-interfaces";

export default function ProductDetails(props: {
  product: Product;
  categories: string[];
  show: boolean;
  onHide: () => void;
  onSave: (product: Product) => void;
}) {
  const [product, setProduct] = useState(props.product);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result as string });
    };
    reader.readAsDataURL(e.target.files![0]);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      size="lg"
      centered
      data-testid="ProductDetail"
    >
      <Modal.Header closeButton>
        <Modal.Title>Product details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className={styles.productDetailForm}>
          <label>Product name:</label>
          <input
            value={product.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <label>Product price:</label>
          <input
            value={product.price || ""}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <label>Product category:</label>
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          >
            {props.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label>Product description:</label>
          <textarea
            value={product.description || ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <label>Product image:</label>
          <div>
            <input type="file" onChange={handleImageChange} />
            <br />
            {product.image && (
              <img
                className={styles.imagePreview}
                src={product.image}
                alt={product.name}
              />
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.onSave(product)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
