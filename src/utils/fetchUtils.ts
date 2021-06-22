import { Product } from "../interfaces/app-interfaces";

export async function fetchProducts(): Promise<Product[]> {
  return await (await fetch("http://localhost:3000/productdata")).json();
}
