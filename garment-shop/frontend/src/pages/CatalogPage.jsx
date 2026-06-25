import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';

const CatalogPage = () => {
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  const [selectedSizes, setSelectedSizes] = useState({});

  // Update selectedSizes when products load
  useEffect(() => {
    if (products.length > 0) {
      const defaultSizes = products.reduce((acc, product) => {
        acc[product._id] = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'S';
        return acc;
      }, {});
      setSelectedSizes(defaultSizes);
    }
  }, [products]);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product) => {
    addToCart(product, selectedSizes[product._id], 1);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Catalog</h1>
          <p className="mt-3 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Catalog</h1>
          <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading products: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Catalog</h1>
        <p className="mt-3 text-gray-600">Select size and add items to your cart instantly.</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center bg-white rounded-3xl p-12">
          <p className="text-gray-600">No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product._id} className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-md">
              <div className="relative w-full bg-gray-100 aspect-square overflow-hidden">
                <img
                  src={product.imageUrl || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">Rs {product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    {product.sizes && product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeChange(product._id, size)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition ${
                          selectedSizes[product._id] === size
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="mt-6 w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
