import React, { useEffect } from 'react';
import { addProductToCart } from '../../helpers/products';
import { useAuth } from '../../context/AuthProvider';

import MyContext from '../../MyContext';

interface ItemProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const { user } = useAuth();
  

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }

    await addProductToCart(user.id, product.id, 1);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-blue-600 font-bold">${product.price}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Item;
