import { Product } from "../types/productType";

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Pro",
    category: "Electronics",
    price: 999,
    image: "📱",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199,
    image: "🎧",
  },
  {
    id: 3,
    name: "Fitness Tracker",
    category: "Electronics",
    price: 129,
    image: "⌚",
  },
  {
    id: 4,
    name: "Designer Jeans",
    category: "Fashion",
    price: 89,
    image: "👖",
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Sports",
    price: 149,
    image: "👟",
  },
  {
    id: 6,
    name: "Coffee Maker",
    category: "Home",
    price: 79,
    image: "☕",
  },
  {
    id: 7,
    name: "Gaming Console",
    category: "Electronics",
    price: 499,
    image: "🎮",
  },
  {
    id: 8,
    name: "Leather Wallet",
    category: "Fashion",
    price: 59,
    image: "👛",
  },
  {
    id: 9,
    name: "Smart Watch",
    category: "Electronics",
    price: 299,
    image: "⌚",
  },
  {
    id: 10,
    name: "Tennis Racket",
    category: "Sports",
    price: 119,
    image: "🎾",
  },
  {
    id: 11,
    name: "Blender",
    category: "Home",
    price: 69,
    image: "🥤",
  },
  {
    id: 12,
    name: "Dress Shirt",
    category: "Fashion",
    price: 49,
    image: "👔",
  },
];

export const categories = [
  ...new Set(products.map((product) => product.category)),
];

export const getMaxPrice = () => {
  return Math.max(...products.map((product) => product.price));
};

export const getAveragePrice = (filteredProducts: Product[]) => {
  const total = filteredProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  return total / filteredProducts.length;
};

export const getMostExpensiveProduct = (filteredProducts: Product[]) => {
  return filteredProducts.reduce(
    (max, product) => (max.price > product.price ? max : product),
    filteredProducts[0]
  );
};
