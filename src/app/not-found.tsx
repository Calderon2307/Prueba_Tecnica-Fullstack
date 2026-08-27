import Link from "next/link";
import { MdSearchOff } from "react-icons/md";

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <MdSearchOff
          aria-hidden="true"
          className="mx-auto size-20 text-secondary"
        />

        <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>

        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Página no encontrada
        </h1>

        <p className="mt-4 font-body text-base leading-relaxed text-foreground/70">
          La página que buscas no existe, fue eliminada o la dirección ingresada
          no es correcta.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-body font-semibold text-on-dark transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
}