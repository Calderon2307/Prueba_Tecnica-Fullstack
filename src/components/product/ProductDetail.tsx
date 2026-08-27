import { Product } from "@/types/product";
import Image from "next/image";
import { RatingStars } from "@components/ui/RatingStars/RatingStars";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { category, price, title, rating, image, description } = product;

  return (
    <article
      className={`mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 md:grid-cols-5 md:items-start lg:gap-12 lg:px-8`}
    >
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-foreground bg-background md:col-span-2 md:aspect-[2/3]`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes={`(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 40vw, 480px`}
          className={`object-contain p-6 sm:p-8 lg:p-10`}
        />
      </div>

      <div className={`flex flex-col md:col-span-3 md:pt-2`}>
        <span className="w-fit rounded-full bg-secondary px-4 py-1.5 font-body text-sm font-medium capitalize text-on-dark">
          {category}
        </span>

        <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <div className="mt-6 w-fit">
          <RatingStars rating={rating.rate} count={rating.count} />
        </div>

        <p className="mt-6 font-heading text-2xl font-semibold text-primary sm:text-3xl">
          {formatCurrency(price)}
        </p>

        <section aria-labelledby="product-description-title" className="mt-7">
          <h2
            id="product-description-title"
            className="font-heading text-xl font-semibold text-foreground sm:text-2xl"
          >
            Descripción
          </h2>

          <p className="mt-3 font-body text-base leading-relaxed text-foreground/80">
            {description}
          </p>
        </section>
      </div>
    </article>
  );
};
