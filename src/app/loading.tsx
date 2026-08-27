import { ProductCardSkeleton } from "@components/product/ProductCardSkeleton";

const SKELETON_COUNT = 8;

export default function Loading() {
  return (
    <section
      role="status"
      aria-live="polite"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <span className="sr-only">Cargando productos...</span>

      <div aria-hidden="true" className="space-y-6">
        <div className="max-w-xl space-y-2">
          <div className="h-6 w-40 animate-pulse rounded-md bg-foreground/20 motion-reduce:animate-none" />

          <div className="h-12 w-full animate-pulse rounded-xl border-2 border-foreground/20 bg-foreground/10 motion-reduce:animate-none" />
        </div>

        <div className="space-y-2">
          <div className="h-6 w-24 animate-pulse rounded-md bg-foreground/20 motion-reduce:animate-none" />

          <div className="flex flex-wrap gap-3">
            <div className="h-11 w-16 animate-pulse rounded-2xl bg-foreground/20 motion-reduce:animate-none" />
            <div className="h-11 w-36 animate-pulse rounded-2xl bg-foreground/20 motion-reduce:animate-none" />
            <div className="h-11 w-24 animate-pulse rounded-2xl bg-foreground/20 motion-reduce:animate-none" />
            <div className="h-11 w-28 animate-pulse rounded-2xl bg-foreground/20 motion-reduce:animate-none" />
            <div className="h-11 w-40 animate-pulse rounded-2xl bg-foreground/20 motion-reduce:animate-none" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
