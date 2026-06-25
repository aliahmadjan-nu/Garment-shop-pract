import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Handle both API format (imageUrl) and local data format (image)
  const imageUrl = product.imageUrl || product.image;
  // Get first tag if available
  const tag = product.tags?.[0] || product.category || 'New';

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-md">
      <div className="relative w-full bg-gray-100 aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-2"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            {tag}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-600">{product.description || 'Premium quality garment'}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">Rs {product.price.toFixed(2)}</span>
          <Link
            to="/catalog"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
