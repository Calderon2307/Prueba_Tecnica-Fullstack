import { Product } from "@/types/product";

export const ALL_CATEGORY = "All";

interface ProductFiltersProps {
  categories: readonly Product["category"][];
  searchTerm: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const CATEGORY_BUTTON_CLASSES =
  "min-h-11 rounded-2xl border-2 border-foreground px-4 py-2 font-body text-base font-semibold capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export const ProductFilters = ({
  categories,
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) => {
  const categoryOptions = [ALL_CATEGORY, ...categories];

  return (
    <section aria-label={`Filtros de productos`} className={`space-y-7`}>
      <div>
        <label
          htmlFor={`product-search`}
          className={`block font-heading text-lg font-semibold text-foreground sm:text-xl`}
        >
          Search for product:
        </label>
        <input
          id={`product-search`}
          name={`product-search`}
          type={"search"}
          value={searchTerm}
          placeholder={`Men's jacket...`}
          autoComplete={"off"}
          aria-controls={"product-grid"}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          className={`w-full rounded-xl border-2 border-foreground bg-background px-4 py-3 font-body text-base text-foreground outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-primary/20`}
        />
      </div>

      <fieldset className={`space-y-2`}>
        <legend
          className={`font-heading text-lg font-semibold text-foreground sm:text-xl`}
        >
          Category:
        </legend>
        <div className={`flex flex-wrap gap-3`}>
          {categoryOptions.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={`${category}`}
                type={"button"}
                aria-pressed={isSelected}
                aria-controls={"product-grid"}
                onClick={() => onCategoryChange(category)}
                className={`${CATEGORY_BUTTON_CLASSES} ${
                  isSelected
                    ? "bg-accent text-foreground hover:bg-accent/90"
                    : "bg-secondary text-on-dark hover:bg-secondary/90"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
};
