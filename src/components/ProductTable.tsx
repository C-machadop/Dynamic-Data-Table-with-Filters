import { Product } from "../types/productType";

interface ProductTableProps {
  products: Product[];
  sortField: string;
  sortDirection: "asc" | "desc";
  setSortField: (field: string) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIndicator = (field: string) => {
    if (sortField !== field) return "";
    return sortDirection === "asc" ? "↑" : "↓";
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full overflow-x-auto rounded-lg shadow-lg mb-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-purple-900 text-white">
              <th className="p-4">Image</th>
              <th
                className="p-4 cursor-pointer hover:bg-purple-800"
                onClick={() => handleSort("name")}
              >
                Name {getSortIndicator("name")}
              </th>
              <th className="p-4">Category</th>
              <th
                className="p-4 cursor-pointer hover:bg-purple-800"
                onClick={() => handleSort("price")}
              >
                Price {getSortIndicator("price")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`${
                    index % 2 === 0 ? "bg-purple-50" : "bg-white"
                  } hover:bg-purple-100 transition-colors`}
                >
                  <td className="p-4 text-center text-3xl">{product.image}</td>
                  <td className="p-4 font-medium text-purple-900">
                    {product.name}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-purple-700">
                    ${product.price}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No se encontraron productos con los filtros actuales
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="flex items-center gap-1">
            {/* prev botton */}
            {currentPage === 1 ? (
              <span className="px-3 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Previous
              </span>
            ) : (
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className="px-3 py-2 rounded-md bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Previous
              </button>
            )}
            {/* page number */}
            <div className="flex items-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 mx-1 flex items-center justify-center rounded-md ${
                      currentPage === page
                        ? "bg-purple-600 text-white font-medium"
                        : "bg-white border border-purple-200 text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            {/* next btn*/}
            {currentPage === totalPages ? (
              <span className="px-3 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed flex items-center">
                Siguiente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            ) : (
              <button
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                className="px-3 py-2 rounded-md bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center"
              >
                Siguiente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
