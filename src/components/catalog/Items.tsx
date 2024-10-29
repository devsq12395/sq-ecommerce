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
        data.forEach((x) => console.log(x.id));
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
    <div className="min-h-screen min-w-max flex items-center justify-center bg-gray-100">
      <div className="w-11/12 max-w-5xl p-6 bg-white border border-gray-300 shadow-lg rounded-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Product Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
