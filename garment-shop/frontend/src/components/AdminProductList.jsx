import { useState } from 'react';
import EditProductForm from './EditProductForm';
import { Trash2, Edit2 } from 'lucide-react';

const AdminProductList = ({ products, onProductUpdated, onProductDeleted }) => {
  const [editingId, setEditingId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleting(productId);
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        onProductDeleted(productId);
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting product');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-50 rounded overflow-hidden shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sizes?.join(', ')}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-900 font-medium">Rs {product.price.toFixed(2)}</td>
              <td className="px-6 py-4 text-gray-600">{product.category}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingId(editingId === product._id ? null : product._id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deleting === product._id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form (inline) */}
      {editingId && (
        <div className="border-t bg-gray-50 p-6">
          <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
          <EditProductForm
            product={products.find(p => p._id === editingId)}
            onProductUpdated={(updatedProduct) => {
              onProductUpdated(updatedProduct);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
