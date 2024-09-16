import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../helpers/products';
import { useAuth } from '../../context/AuthProvider';

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        const data = await getCartItems(user.id);
        setCartItems(data || []);
      }
      setLoading(false);
    };

    fetchCartItems();
  }, [user]);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!cartItems.length) {
    return <p>Your cart is empty.</p>;
  }

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.cart_item_id} className="border-b pb-4">
            <p className="font-semibold">{item.product.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
            <p>Total: ${(item.quantity * item.product.price).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 font-bold text-lg">
        Total: ${getTotalPrice().toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
