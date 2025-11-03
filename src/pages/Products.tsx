import React, { useState, useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import BreadCrumbs from "../components/molecules/BreadCrumbs";
import type { Product as ProductType } from "../types/Product";
import productData from "../assets/products.json";
import Product from "../components/molecules/Product";

const Products = () => {
  useDocumentTitle("Products | Aetheria | Fragrances Beyond Eras");
  const [initialProducts, setInitialProducts] = useState<ProductType[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [edition, setEdition] = useState<string | null>(null);
  useEffect(() => {
    const data = productData;
    setInitialProducts(data);
  }, []);
  const getFilteredProducts = (
    products: ProductType[],
    selectedNote: string | null,
    selectedEdition: string | null
  ): ProductType[] => {
    // If no filters are active, return the original list immediately
    if (!selectedNote && !selectedEdition) {
      return products;
    }

    return products.filter((product) => {
      // 1. NOTES Filter Check:
      // If selectedNote is null/empty, this condition is TRUE (pass).
      // If selectedNote is active, check if the product's notes array includes the selection.
      const passesNoteFilter =
        // If the filter is null/empty, we always pass.
        !selectedNote ||
        // If a filter IS selected, run the conversion:
        product.notes
          .map((note: any) => note.toLowerCase()) // 🔑 Step 1: Create a NEW array where every note is lowercase.
          .includes(selectedNote);

      // 2. EDITION Filter Check:
      // If selectedEdition is null/empty, this condition is TRUE (pass).
      // If selectedEdition is active, check if the product's edition property matches the selection.
      const passesEditionFilter =
        !selectedEdition ||
        product.edition.toLowerCase().includes(selectedEdition);

      // 3. COMBINATION: Use AND (&&) to ensure the product passes ALL active filters.
      return passesNoteFilter && passesEditionFilter;
    });
  };
  const getSortedProducts = (
    products: ProductType[],
    key: string | null
  ): ProductType[] => {
    if (!key) return products;

    const sortedList = [...products];

    sortedList.sort((a: any, b: any) => {
      switch (key) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc": // Price, low to high
          return a.sizes[0].price - b.sizes[0].price;
        case "price-desc": // Price, high to low
          return b.sizes[0].price - a.sizes[0].price;

        case "date-asc": // Date, old to new (Smaller timestamp comes first)
          // 🔑 FIX: a minus b
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        case "date-desc": // Date, new to old (Larger timestamp comes first)
          // b minus a
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        default:
          return 0;
      }
    });

    return sortedList;
  };

  const filteredProducts = React.useMemo(() => {
    // Start with the original list of products
    return getFilteredProducts(initialProducts, notes, edition);

    // Recalculate only when the source data or filter keys change
  }, [initialProducts, notes, edition]);

  const finalProducts = React.useMemo(() => {
    // Apply sorting logic to the ALREADY filtered list
    return getSortedProducts(filteredProducts, sortKey);

    // Recalculate only when the filtered list or the sort key changes
  }, [filteredProducts, sortKey]);
  const clearFilters = () => {
    setNotes(null);
    setEdition(null);
    setSortKey(null); // Keep this here to reset the sort display
  };
  const isFilterActive = notes !== null || edition !== null;

  return (
    <div className="product__home">
      <div className="padding-global">
        <div className="product__home__component">
          <div className="product__home__heading">
            <BreadCrumbs />
            <h1 className="heading-style-h2">Discover Latest Realizes</h1>
            <div className="product__home__box">
              <p className="text-size-medium">
                Every fragrance in Aetheria exists once - a limited edition, a
                preserved second in history.
              </p>
              <div className="product__home__sort">
                <p className="text-size-regular">Sort by:</p>
                <select
                  className="product__home__select"
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="name-asc">Alphabetically, A-Z</option>
                  <option value="name-desc">Alphabetically, Z-A</option>
                  <option value="price-asc">Price, low to high</option>
                  <option value="price-desc">Price, high to low</option>
                  <option value="date-asc">Date, old to new</option>
                  <option value="date-desc">Date, new to old</option>
                </select>
              </div>
            </div>
            <div className="product__home__filters__wrapper">
              <div className="product__home__filters">
                <select
                  className="product__home__select"
                  defaultValue=""
                  onChange={(e) => setNotes(e.target.value)}
                >
                  <option value="" disabled selected>
                    Notes
                  </option>
                  <option value="amber">Amber</option>
                  <option value="tobacco">Tobacco</option>
                  <option value="ozone">Ozone</option>
                  <option value="iris">Iris</option>
                  <option value="sandalwood">Sandalwood</option>
                  <option value="smoke">Smoke</option>
                  <option value="ink">Ink</option>
                </select>

                <select
                  className="product__home__select"
                  defaultValue=""
                  onChange={(e) => setEdition(e.target.value)}
                >
                  <option value="" disabled selected>
                    Edition
                  </option>
                  <option value="limited">Limited Edition</option>
                  <option value="archive">Archive Edition</option>
                  <option value="timeless">Timeless Edition</option>
                </select>
              </div>
              <div className="product__home__clear">
                <p className="text-size-regular">
                  {finalProducts.length} products found
                </p>
                {isFilterActive && (
                  <button onClick={clearFilters} className="button">
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="product__grid">
            {finalProducts.length > 0 ? (
              finalProducts.map((product, index) => {
                return (
                  <Product
                    key={product.id}
                    productData={product}
                    productIndex={`(0${index + 1})`}
                  />
                );
              })
            ) : (
              <div className="product__home__nofound">
                <p className="text-size-regular">No items found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
