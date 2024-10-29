import React, { useEffect, useState } from 'react';
import { getProduct } from '../../helpers/products';
import Item from './Item';

const Items: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProduct();
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 border border-gray-300 shadow-lg rounded-md mt-6">
      <h2 className="text-center text-2xl font-semibold mb-4">Product Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Items;
