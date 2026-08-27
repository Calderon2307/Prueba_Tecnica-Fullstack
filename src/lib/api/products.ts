import { Product } from "@/types/product";

const FAKE_STORE_API_URL = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${FAKE_STORE_API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const products: Product[] = await response.json();

  return products;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const response = await fetch(`${FAKE_STORE_API_URL}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error HTTP al obtener el producto: ${response.status}`);
  }

  const product: Product | null = await response.json();

  return product;
};
