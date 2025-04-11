import { Product } from "../types/productType";

interface ProductTableProps {
  products: Product[];
  sortField: string;
  sortDirection: "asc" | "desc";
  setSortField: (field: string) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
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
  );
};

export default ProductTable;
