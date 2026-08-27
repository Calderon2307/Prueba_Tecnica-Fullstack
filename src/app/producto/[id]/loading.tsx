import { ProductDetailSkeleton } from "@/components/product/ProductDetailSkeleton";

export default function ProductDetailLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Cargando detalle del producto...</span>

      <ProductDetailSkeleton />
    </div>
  );
}
