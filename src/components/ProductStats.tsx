import { Product } from "../types/productType";

interface ProductStatsProps {
  mostExpensive: Product | null;
  averagePrice: number;
}

const ProductStats: React.FC<ProductStatsProps> = ({
  mostExpensive,
  averagePrice,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg p-6 shadow-lg transform transition-all hover:scale-105">
        <h3 className="text-xl font-bold text-white mb-2">
          Product most expensive
        </h3>
        {mostExpensive ? (
          <div className="flex items-center">
            <span className="text-4xl mr-4">{mostExpensive.image}</span>
            <div>
              <p className="text-white font-semibold text-lg">
                {mostExpensive.name}
              </p>
              <p className="text-white text-2xl font-bold">
                ${mostExpensive.price}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-white">There's no product to show</p>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 shadow-lg transform transition-all hover:scale-105">
        <h3 className="text-xl font-bold text-white mb-2">Precio promedio</h3>
        <div className="flex items-center justify-center">
          <span className="text-white text-4xl font-bold">
            ${averagePrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductStats;
