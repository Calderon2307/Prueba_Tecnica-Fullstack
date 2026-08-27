const STAR_SKELETON_COUNT = 5;

export const ProductDetailSkeleton = () => {
  return (
    <article
      aria-hidden="true"
      className="mx-auto grid w-full max-w-7xl animate-pulse gap-8 px-4 py-8 motion-reduce:animate-none sm:px-6 sm:py-10 md:grid-cols-5 md:items-start lg:gap-12 lg:px-8"
    >
      <div className="aspect-[4/5] w-full rounded-2xl border-2 border-foreground bg-foreground/20 md:col-span-2 md:aspect-[2/3]" />

      <div className="flex flex-col md:col-span-3 md:pt-2">
        <div className="h-7 w-28 rounded-full bg-foreground/20" />

        <div className="mt-5 h-10 w-4/5 rounded-lg bg-foreground/20" />

        <div className="mt-6 flex w-fit flex-col items-center gap-2">
          <div className="h-6 w-16 rounded-md bg-foreground/20" />

          <div className="flex gap-1">
            {Array.from({ length: STAR_SKELETON_COUNT }, (_, index) => (
              <div key={index} className="size-7 rounded-md bg-foreground/20" />
            ))}
          </div>

          <div className="h-4 w-24 rounded-md bg-foreground/20" />
        </div>

        <div className="mt-6 h-9 w-28 rounded-lg bg-foreground/20" />

        <div className="mt-7">
          <div className="h-8 w-36 rounded-lg bg-foreground/20" />

          <div className="mt-4 space-y-2">
            <div className="h-4 w-full rounded-full bg-foreground/20" />
            <div className="h-4 w-full rounded-full bg-foreground/20" />
            <div className="h-4 w-11/12 rounded-full bg-foreground/20" />
            <div className="h-4 w-3/4 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </article>
  );
};
