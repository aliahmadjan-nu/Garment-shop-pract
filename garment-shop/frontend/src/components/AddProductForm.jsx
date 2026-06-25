import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../utils/api';

const AddProductForm = ({ onProductAdded, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    sizes: [],
    stock: '',
    quantities: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0
    }
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  // remove unused sizeInput or keep for future; currently not used

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleQuantityChange = (size, value) => {
    const qty = parseInt(value || 0, 10);
    setFormData(prev => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [size]: Number.isNaN(qty) ? 0 : qty
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    // compute total stock from size quantities
    const totalStock = Object.values(formData.quantities).reduce((s, v) => s + (parseInt(v, 10) || 0), 0);

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.imageUrl) {
      setError('All fields are required');
      return;
    }

    if (formData.sizes.length === 0) {
      setError('Please select at least one size');
      return;
    }

    if (totalStock <= 0) {
      setError('Please provide quantity for at least one size');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          sizes: formData.sizes,
          stock: totalStock,
          quantities: formData.quantities,
          imageUrl: formData.imageUrl
        })
      });

      const data = await response.json();

      if (response.ok) {
        onProductAdded(data);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          sizes: [],
          stock: '',
          quantities: { S:0, M:0, L:0, XL:0, XXL:0 },
          imageUrl: ''
        });
      } else {
        setError(data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Add product error:', err);
      setError('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Premium Cotton T-Shirt"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Shirts, Pants, Dresses"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 24.99"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Detailed product description..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  formData.sizes.includes(size)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Size Quantities</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {availableSizes.map(size => (
              <div key={size} className="flex flex-col">
                <label className="text-xs text-gray-600">{size}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.quantities[size]}
                  onChange={(e) => handleQuantityChange(size, e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
