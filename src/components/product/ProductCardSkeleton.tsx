import { MdOutlineImage } from "react-icons/md";

export const ProductCardSkeleton = () => {
  return (
    <article aria-hidden="true" className="h-full">
      <div className="flex h-full w-full animate-pulse flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-background motion-reduce:animate-none">
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border-b-2 border-foreground bg-background">
          <div className="absolute left-0 top-6 h-8 w-2/5 rounded-r-xl bg-foreground/20" />

          <div className="flex h-[60%] w-[60%] items-center justify-center rounded-3xl bg-foreground/20">
            <MdOutlineImage
              aria-hidden="true"
              className="h-1/2 w-1/2 text-background"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-7">
          <div className="h-6 w-full rounded-full bg-foreground/20" />

          <div className="h-6 w-4/5 rounded-full bg-foreground/20" />

          <div className="mt-auto h-10 w-1/3 rounded-lg bg-foreground/20 sm:h-12" />
        </div>
      </div>
    </article>
  );
};
