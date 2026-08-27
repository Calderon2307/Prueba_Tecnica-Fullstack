import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

type ProductCardProps = Pick<
  Product,
  "id" | "image" | "title" | "price" | "category"
>;

export const ProductCard = ({
  id,
  category,
  image,
  title,
  price,
}: ProductCardProps) => {
  return (
    <article className={`h-full`}>
      <Link
        href={`/product/${id}`}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-background shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
      >
        <div
          className={`relative aspect-square w-full overflow-hidden border-b-2 border-foreground bg-background`}
        >
          <Image
            src={image}
            alt={`${title} image`}
            fill
            sizes={`(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw`}
            className={`object-contain p-6 transition-transform duration-300 group-hover:scale-150 group-focus-visible:scale-105 sm:p-8`}
          />

          <span
            className={`absolute left-0 top-6 z-10 max-w-[85%] truncate rounded-r-xl bg-secondary px-3 py-1.5 font-body text-sm font-semibold text-on-dark sm:text-base`}
          >
            {category}
          </span>
        </div>

        <div className={`flex flex-1 flex-col gap-6 p-5 sm:p-7`}>
          <h2
            className={`line-clamp-2 font-heading text-xl font-semibold leading-snug text-foreground sm:text-2xl`}
          >
            {title}
          </h2>
          <p
            className={`mt-auto font-heading text-3xl font-semibold text-primary sm:text-4xl`}
          >
            {formatCurrency(price)}
          </p>
        </div>
      </Link>
    </article>
  );
};
