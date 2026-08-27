import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import { ProductDetail } from "@components/product/ProductDetail";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const parseProductId = (id: string): number | null => {
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return null;
  }

  return productId;
};

export const generateMetadata = async ({
  params,
}: ProductDetailPageProps): Promise<Metadata> => {
  const { id } = await params;
  const productId = parseProductId(id);

  if (productId === null) {
    return {
      title: "Producto no encontrado",
    };
  }

  const product = await getProductById(productId);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
  };
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseProductId(id);

  if (productId === null) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
