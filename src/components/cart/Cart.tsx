import React, { useEffect, useContext } from 'react';
import { getCartItems } from '../../helpers/products';
import MyContext from '../../MyContext';

const Cart: React.FC = () => {
  const context = useContext(MyContext);

  const { user, userId, cart, setCart } = context;
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        console.log (user);
        const data = await getCartItems(userId);
        console.log (cart);
        console.log (setCart);
        setCart(data || []); // Ensure cart is always set as an array
      }
      setLoading(false);
    };

    fetchCartItems();
  }, [user, setCart]); // Make sure setCart is in the dependency array

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
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
