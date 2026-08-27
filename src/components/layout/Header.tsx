import Link from "next/link";

export const Header = () => {
  return (
    <header className={`w-full bg-primary`}>
      <div
        className={`mx-auto flex min-h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8`}
      >
        <Link
          href={"/"}
          aria-label={"Ir a la página principal"}
          className={`rounded-sm font-heading text-2xl font-bold uppercase tracking-wide text-on-dark transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-dark sm:text-3xl`}
        >
          Catalog
        </Link>
      </div>
    </header>
  );
};
