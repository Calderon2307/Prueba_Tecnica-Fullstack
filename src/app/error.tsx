"use client";

import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <MdErrorOutline
          aria-hidden="true"
          className="mx-auto size-20 text-accent"
        />

        <h1 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Algo salió mal
        </h1>

        <p className="mt-4 font-body text-base leading-relaxed text-foreground/70">
          No pudimos cargar el catálogo de productos. Intenta nuevamente dentro
          de unos segundos.
        </p>

        <button
          type="button"
          onClick={retry}
          className="mt-8 rounded-xl bg-primary px-6 py-3 font-body font-semibold text-on-dark transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Intentar de nuevo
        </button>
      </div>
    </section>
  );
}