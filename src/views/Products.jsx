import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import ProductGridCard from "../components/ProductGridCard";

// const API_BASE = "http://localhost:3000/api/products";
const API_BASE = import.meta.env.VITE_API_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // search
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("newest");


  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

//  fetch products (server-side search)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          limit: 20,
        });

        if (search) params.append("q", search);

        const res = await fetch(`${API_BASE}/products?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

//  derive categories from products
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

//  client-side filter + sort
  const visibleProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory) {
      list = list.filter(
        (p) => p.category === selectedCategory
      );
    }

    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "popular") return b.popularity_score - a.popularity_score;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return list;
  }, [products, selectedCategory, sort]);

  // render
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* title  */}
        <div className="flex justify-center mb-8">
          <h1 className="w-full max-w-md text-2xl md:text-3xl font-bold text-center bg-[#A6EAFF] py-4 md:py-6 rounded-full">
            Product
          </h1>
        </div>

        {/* controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* search */}
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 rounded-xl border border-pink-300"
          />

          {/* category (from product only) */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border border-pink-300 cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-xl border border-pink-300 cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {/* empty state */}
        {visibleProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No products found 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visibleProducts.map((product) => (
              <ProductGridCard
                key={product._id}
                id={product._id}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                product={product}
                onPreview={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}