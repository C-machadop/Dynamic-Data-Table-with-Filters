import { useEffect, useMemo, useState } from "react";
import ProductFilter from "./components/ProductFilter";
import {
  getAveragePrice,
  getMaxPrice,
  getMostExpensiveProduct,
  products,
} from "./data/productData";
import ProductStats from "./components/ProductStats";
import ProductTable from "./components/ProductTable";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Products per page

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          (selectedCategory === "" || product.category === selectedCategory) &&
          product.price <= maxPrice
      )
      .sort((a, b) => {
        const fieldA = a[sortField as keyof typeof a];
        const fieldB = b[sortField as keyof typeof b];

        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return sortDirection === "asc"
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        } else {
          return sortDirection === "asc"
            ? Number(fieldA) - Number(fieldB)
            : Number(fieldB) - Number(fieldA);
        }
      });
  }, [selectedCategory, maxPrice, sortField, sortDirection]);

  // get the total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // get the current products of the page
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage, productsPerPage]);

  // change the page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mostExpensiveProduct = useMemo(() => {
    return filteredProducts.length > 0
      ? getMostExpensiveProduct(filteredProducts)
      : null;
  }, [filteredProducts]);

  const averagePrice = useMemo(() => {
    return filteredProducts.length > 0 ? getAveragePrice(filteredProducts) : 0;
  }, [filteredProducts]);

  // Reset the filters
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, maxPrice]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Product Table
          </h1>
          <p className="text-lg text-purple-700">
            Explore, filter and order our products collection
          </p>
        </header>
        {/*  */}
        <ProductFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          highestPrice={getMaxPrice()}
        />

        <ProductStats
          mostExpensive={mostExpensiveProduct}
          averagePrice={averagePrice}
        />

        <ProductTable
          products={currentProducts}
          sortField={sortField}
          sortDirection={sortDirection}
          setSortField={setSortField}
          setSortDirection={setSortDirection}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <footer className="text-center text-gray-500 mt-8">
          Total products showing: {filteredProducts.length}
          <p>
            Mostrando página {currentPage} de {totalPages}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
