import React, { useEffect, useContext } from 'react';
import { getCartItems } from '../../helpers/products';
import MyContext from '../../MyContext';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const context = useContext(MyContext);

  const { user, userId, cart, setCart } = context;
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        const data = await getCartItems(userId);
        setCart(data || []); 
      }
      setLoading(false);
    };

    fetchCartItems();
  }, [user, setCart]);

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
    <div className="flex justify-center py-10">
      <div className="w-full max-w-[75%] min-w-[500px] bg-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <ul className="space-y-4">
          {cart.map((item) => (
            <CartItem key={item.cart_item_id} item={item} />
          ))}
        </ul>
        <div className="mt-6 font-bold text-lg">
          Total: ${getTotalPrice().toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
