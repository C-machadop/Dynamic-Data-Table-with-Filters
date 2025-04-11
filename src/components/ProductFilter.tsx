import { categories } from "../data/productData";

interface ProductFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  highestPrice: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  highestPrice,
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Filtros</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <label className="block text-white font-medium mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm border border-purple-300 rounded-lg text-purple-900 placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="text-purple-900"
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-white font-medium mb-2">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max={highestPrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
