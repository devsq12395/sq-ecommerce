import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface CartItemProps {
  item: {
    cart_item_id: string;
    product: {
      name: string;
      price: number;
      description: string;
      image_url: string;
    };
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex items-center p-4 border rounded-lg shadow-sm">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 mr-4">
        <img 
          src={item.product.image_url} 
          alt={item.product.name} 
          className="w-full h-full object-cover rounded-md" 
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{item.product.description}</p>
        <p className="text-gray-600">Price: ${item.product.price}</p>
      </div>

      {/* Quantity Adjuster and Remove Button */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Quantity:</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">-</button>
            <span className="px-4 py-1 border rounded-md">{item.quantity}</span>
            <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">+</button>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-700 p-2">
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
