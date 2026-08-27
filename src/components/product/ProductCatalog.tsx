"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import {
  ALL_CATEGORY,
  ProductFilters,
} from "@components/product/ProductFilters";
import { ProductCard } from "@components/product/ProductCard";

interface ProductCatalogProps {
  products: Product[];
}

export const ProductCatalog = ({ products }: ProductCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);

  const categories = Array.from(
    new Set(products.map((product: Product) => product.category)),
  )
    .filter((category) => category !== ALL_CATEGORY)
    .sort((firstCategory, secondCategory) =>
      firstCategory.localeCompare(secondCategory),
    );

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(normalizedSearchTerm);

    const matchesCategory =
      selectedCategory === ALL_CATEGORY ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section
      aria-labelledby={`product-catalog-title`}
      className={`mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8`}
    >
      <h1 id="product-catalog-title" className={`sr-only`}>
        Product catalog
      </h1>

      <ProductFilters
        categories={categories}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      <div id={`product-grid`} className={`mt-8`}>
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
          >
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                category={product.category}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p
            role={"status"}
            className={`rounded-2xl border  border-foreground/20 bg-background p-8 text-center font-body text-foreground/70`}
          >
            No products were found that match the selected filters.
          </p>
        )}
      </div>
    </section>
  );
};
