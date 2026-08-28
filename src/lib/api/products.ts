import fallbackProductsData from "@/data/fallback-products.json";
import { Product } from "@/types/product";

const FAKE_STORE_API_URL = "https://fakestoreapi.com";
const fallbackProducts: Product[] = fallbackProductsData;

const API_HEADERS: HeadersInit = {
  Accept: "application/json",
  "User-Agent": "ProductCatalog/1.0",
};

const FALLBACK_STATUS_CODES: readonly number[] = [401, 403, 408, 429];

const shouldUseFallback = (status: number): boolean => {
  const isKnownFallbackStatus = FALLBACK_STATUS_CODES.includes(status);
  const isServerError = status >= 500 && status <= 599;

  return isKnownFallbackStatus || isServerError;
};

const findFallbackProductById = (id: number): Product | null => {
  return fallbackProducts.find((product) => product.id === id) ?? null;
};

const isRecoverableRequestError = (error: unknown): boolean => {
  return error instanceof TypeError || error instanceof SyntaxError;
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${FAKE_STORE_API_URL}/products`, {
      cache: "no-store",
      headers: API_HEADERS,
    });

    if (shouldUseFallback(response.status)) {
      console.warn(
        `[getProducts] Fake Store API responded with ${response.status}. Using fallback data.`,
      );

      return fallbackProducts;
    }

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const products: Product[] = await response.json();

    return products;
  } catch (error) {
    if (isRecoverableRequestError(error)) {
      console.warn(
        "[getProducts] Fake Store API request failed. Using fallback data.",
        error,
      );

      return fallbackProducts;
    }

    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${FAKE_STORE_API_URL}/products/${id}`, {
      cache: "no-store",
      headers: API_HEADERS,
    });

    if (response.status === 404) {
      return null;
    }

    if (shouldUseFallback(response.status)) {
      console.warn(
        `[getProductById] Fake Store API responded with ${response.status} for product ${id}. Using fallback data.`,
      );

      return findFallbackProductById(id);
    }

    if (!response.ok) {
      throw new Error(`Error HTTP al obtener el producto: ${response.status}`);
    }

    const product: Product | null = await response.json();

    return product;
  } catch (error) {
    if (isRecoverableRequestError(error)) {
      console.warn(
        `[getProductById] Fake Store API request failed for product ${id}. Using fallback data.`,
        error,
      );

      return findFallbackProductById(id);
    }

    throw error;
  }
};
