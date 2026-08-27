import { getProducts } from "@/lib/api/products";
import { ProductCatalog } from "@components/product/ProductCatalog";

export default async function Home() {
  const products = await getProducts();

  return <ProductCatalog products={products} />;
}
