import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQty, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added any garments to your bag yet. 
          Check out our latest arrivals!
        </p>
        <Link 
          to="/" 
          className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Bag</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Left Side: Cart Items List */}
        <section className="lg:col-span-8">
          <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {cartItems.map((item) => (
              <li key={`${item._id}-${item.size}`} className="flex py-6 sm:py-8">
                {/* Product Image - Optimized with shrink-0 */}
                <div className="shrink-0">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-contain object-center sm:w-32 sm:h-32 bg-gray-100"
                  />
                </div>

                {/* Product Info */}
                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">Rs {item.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-md w-max">
                        <button 
                          onClick={() => updateCartQty(item._id, item.size, item.qty - 1)}
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          disabled={item.qty <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="min-w-8 text-center font-medium text-gray-900 text-sm">
                          {item.qty}
                        </span>
                        
                        <button 
                          onClick={() => updateCartQty(item._id, item.size, item.qty + 1)}
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          disabled={item.qty >= (item.stock ?? 10)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute top-0 right-0 sm:top-auto sm:right-auto sm:mt-2">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id, item.size)}
                          className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Right Side: Order Summary */}
        <section className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Order summary</h2>
          
          <dl className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-gray-900">Rs {getCartTotal()}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="text-green-600 font-medium">Free</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
              <dt className="text-base font-bold text-gray-900">Order Total</dt>
              <dd className="text-base font-bold text-gray-900">Rs {getCartTotal()}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <button
              type="button"
              className="w-full bg-blue-600 border border-transparent rounded-lg shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex justify-center items-center space-x-2 transition-colors"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;